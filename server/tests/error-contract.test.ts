import { describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";

import { createApp } from "../create-app";
import { AppError, ERROR_CODES } from "../errors/AppError";
import { errorMiddleware } from "../middleware/error.middleware";

/**
 * Every API error should share the same JSON shape so the frontend can handle
 * failures consistently.
 */
describe("API error contract", () => {
  it("returns structured JSON for unknown routes", async () => {
    const app = createApp();

    const response = await request(app).get("/this-route-does-not-exist");

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      code: ERROR_CODES.NOT_FOUND,
      message: expect.stringContaining("not found"),
    });
  });

  it("returns structured JSON for AppError instances", async () => {
    const app = express();

    app.get("/boom", () => {
      throw new AppError("Something went wrong", 400, ERROR_CODES.VALIDATION_ERROR, {
        email: ["Invalid email address"],
      });
    });

    app.use(errorMiddleware);

    const response = await request(app).get("/boom");

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      code: ERROR_CODES.VALIDATION_ERROR,
      message: "Something went wrong",
      details: {
        email: ["Invalid email address"],
      },
    });
  });

  it("returns structured JSON for unexpected errors", async () => {
    const app = express();

    app.get("/crash", () => {
      throw new Error("Database connection lost");
    });

    app.use(errorMiddleware);

    const response = await request(app).get("/crash");

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      success: false,
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: "Database connection lost",
    });
  });
});
