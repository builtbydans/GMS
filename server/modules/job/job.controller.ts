import { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../types/auth.types";

const jobService = require("./job.service");

const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await jobService.getJobs();

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const job = await jobService.getJobById(id);

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobData = req.body;

    const newJob = await jobService.createJob(jobData);

    return res.status(201).json({
      success: true,
      data: newJob,
    });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const updatedJob = await jobService.updateJobById(id, req.body);

    return res.status(200).json({
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const deletedJob = await jobService.deleteJobById(id);

    return res.status(200).json({
      success: true,
      data: deletedJob,
    });
  } catch (error) {
    next(error);
  }
};

const confirmDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const depositPaid = await jobService.confirmDeposit(id);

    return res.status(200).json({
      success: true,
      data: depositPaid,
    });
  } catch (error) {
    next(error);
  }
};

const transitionJob = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const transitionedJob = await jobService.transitionJob(id, {
      targetStatus: req.body.targetStatus,
      reason: req.body.reason,
      actorId: req.auth.userId,
    });

    return res.status(200).json({
      success: true,
      data: transitionedJob,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  confirmDeposit,
  transitionJob,
};
