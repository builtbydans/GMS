import { Request, Response, NextFunction } from "express";

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

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};
