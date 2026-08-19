import { describe, expect, it } from "vitest";
import request from "supertest";

import { createApp } from "../create-app";

/**
 * Integration test — sends real HTTP requests to the Express app in memory.
 *
 * Supertest never opens a network port: it calls the app directly, which makes
 * tests fast and easy to run in CI.
 */
describe("GET /health", () => {
  it("returns a stable health payload", async () => {
    const app = createApp();

    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
      service: "workshop-api",
    });
    expect(response.body.timestamp).toEqual(expect.any(String));
  });
});

describe("GET /health/wrong-path", () => {
  it("returns 404", async () => {
    const app = createApp();
    const response = await request(app).get("/health/not-a-real-route");
    expect(response.status).toBe(404);
  });
});
