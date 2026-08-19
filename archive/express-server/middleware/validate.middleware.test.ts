import { describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";

import { ERROR_CODES } from "../errors/AppError";

const { validateBody } = require("./validate.middleware");
const { errorMiddleware } = require("./error.middleware");
const { createCustomerSchema } = require("../schemas/customer.schema");

/**
 * validateBody middleware — checks Zod schemas before controllers run.
 *
 * We mount a tiny Express app here, the same way error-contract.test.ts does.
 */
describe("validateBody middleware", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.post(
      "/customers",
      validateBody(createCustomerSchema),
      (req: express.Request, res: express.Response) => {
        res.status(201).json({ success: true, data: req.body });
      },
    );
    app.use(errorMiddleware);
    return app;
  };

  it("passes valid payloads through to the handler", async () => {
    const response = await request(buildApp()).post("/customers").send({
      first_name: "Alex",
      last_name: "Smith",
      phone: "07123456789",
      email: "Alex@Example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe("alex@example.com");
  });

  it("returns field-level validation details for bad payloads", async () => {
    const response = await request(buildApp()).post("/customers").send({
      first_name: "Alex",
      last_name: "Smith",
      phone: "07123456789",
      email: "not-valid",
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      code: ERROR_CODES.VALIDATION_ERROR,
      message: "Validation failed",
    });
    expect(response.body.details.email).toEqual(
      expect.arrayContaining([expect.any(String)]),
    );
  });
});
