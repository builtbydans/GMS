import { describe, expect, it } from "vitest";
import request from "supertest";

import { createApp } from "../create-app";
import { ERROR_CODES } from "../errors/AppError";
import { managerAuth } from "./helpers/auth";

/**
 * Integration tests — request validation on customer routes.
 *
 * validateBody runs after auth, so we send a valid manager token.
 * Invalid payloads should be rejected with 400 before hitting the database.
 */
describe("POST /customers validation", () => {
  const app = createApp();

  it("rejects a missing last name", async () => {
    const response = await request(app)
      .post("/customers")
      .set(managerAuth())
      .send({
        first_name: "Alex",
        phone: "07123456789",
        email: "alex@example.com",
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      code: ERROR_CODES.VALIDATION_ERROR,
      message: "Validation failed",
    });
    expect(response.body.details).toBeDefined();
  });

  it("rejects an invalid email address", async () => {
    const response = await request(app)
      .post("/customers")
      .set(managerAuth())
      .send({
        first_name: "Alex",
        last_name: "Smith",
        phone: "07123456789",
        email: "not-an-email",
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
  });
});

describe("PUT /customers/:id validation", () => {
  const app = createApp();

  it("rejects an empty update body", async () => {
    const response = await request(app)
      .put("/customers/customer-123")
      .set(managerAuth())
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      code: ERROR_CODES.VALIDATION_ERROR,
    });
  });
});
