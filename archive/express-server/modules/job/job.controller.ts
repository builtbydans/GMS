import { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../types/auth.types";

const jobService = require("./job.service");

const getJobs = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobs = await jobService.getJobs(req.auth.role, req.auth.employeeId);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const job = await jobService.getJobById(
      id,
      req.auth.role,
      req.auth.employeeId,
    );

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
      note: req.body.note,
      actorId: req.auth.userId,
      actorRole: req.auth.role,
      actorEmployeeId: req.auth.employeeId,
    });

    return res.status(200).json({
      success: true,
      data: transitionedJob,
    });
  } catch (error) {
    next(error);
  }
};

const assignTechnician = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const job = await jobService.assignTechnician(
      id,
      req.body.technicianId ?? null,
      req.auth.role,
    );

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const raiseToManager = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await jobService.raiseToManager(
      req.params.id,
      req.body.note,
      req.auth.role,
      req.auth.employeeId,
    );
    const job = await jobService.getJobById(
      req.params.id,
      req.auth.role,
      req.auth.employeeId,
    );

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const acknowledgeRaise = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await jobService.acknowledgeRaise(
      req.params.id,
      req.params.raiseId,
      req.auth.role,
      req.auth.employeeId,
    );
    const job = await jobService.getJobById(
      req.params.id,
      req.auth.role,
      req.auth.employeeId,
    );

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const resolveRaise = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await jobService.resolveRaise(
      req.params.id,
      req.params.raiseId,
      req.auth.role,
      req.auth.employeeId,
    );
    const job = await jobService.getJobById(
      req.params.id,
      req.auth.role,
      req.auth.employeeId,
    );

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const createWorkItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const job = await jobService.createWorkItem(
      req.params.id,
      req.body,
      req.auth.role,
      req.auth.employeeId,
    );

    return res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const updateWorkItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const job = await jobService.updateWorkItem(
      req.params.id,
      req.params.itemId,
      req.body,
      req.auth.role,
      req.auth.employeeId,
    );

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const deleteWorkItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const job = await jobService.deleteWorkItem(
      req.params.id,
      req.params.itemId,
      req.auth.role,
      req.auth.employeeId,
    );

    return res.status(200).json({
      success: true,
      data: job,
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
  assignTechnician,
  raiseToManager,
  acknowledgeRaise,
  resolveRaise,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem,
};
