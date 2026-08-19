import { describe, expect, it } from "vitest";
import request from "supertest";

import { createApp } from "../create-app";
import { ERROR_CODES } from "../errors/AppError";
import { managerAuth } from "./helpers/auth";

/**
 * Integration tests — auth middleware on real routes.
 *
 * These routes sit behind authenticateMiddleware in create-app.ts.
 * We check the API rejects anonymous callers before any business logic runs.
 */
describe("Authentication on protected routes", () => {
  const app = createApp();

  it("returns 401 when no Authorization header is sent", async () => {
    const response = await request(app).get("/customers");

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      code: ERROR_CODES.UNAUTHORIZED,
    });
  });

  it("returns 401 when the Bearer token is malformed", async () => {
    const response = await request(app)
      .get("/customers")
      .set("Authorization", "Bearer not-a-real-token");

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(ERROR_CODES.UNAUTHORIZED);
  });

  it("allows a valid workshop token through to the next layer", async () => {
    const response = await request(app)
      .get("/customers")
      .set(managerAuth());

    // We expect something other than 401 — the request passed auth.
    // It may be 200 (data) or 500 (no real database in tests) but not unauthorized.
    expect(response.status).not.toBe(401);
  });
});
