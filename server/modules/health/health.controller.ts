import { Response, NextFunction } from "express";

const getHealth = async (_req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    service: "workshop-api",
    timestamp: new Date().toISOString(),
  });
};

module.exports = { getHealth };
