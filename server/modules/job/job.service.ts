const jobRepository = require("./jobRepository");
const auditRepository = require("../audit/auditRepository");
const AppError = require("../../errors/AppError");
import { CreateJobDto, UpdateJobDto } from "../../types/job.types";

const getJobs = async () => {
  return jobRepository.getJobs();
};

const createJob = async (jobData: CreateJobDto) => {
  let { vehicle_id, job_type, description, estimated_cost } = jobData;

  job_type = job_type?.trim();

  description = description?.trim();

  if (!vehicle_id) {
    throw new AppError("Vehicle ID is required", 400);
  }

  if (!job_type) {
    throw new AppError("Job type is required", 400);
  }

  if (estimated_cost !== undefined && estimated_cost < 0) {
    throw new AppError("Estimated cost cannot be negative", 400);
  }

  const job = await jobRepository.createJob({
    vehicle_id,
    job_type,
    description,
    estimated_cost,
  });

  await auditRepository.createAuditLog({
    entity_type: "job",
    entity_id: job.id,
    action: "CREATE",
    old_value: null,
    new_value: job,
  });

  return job;
};

const updateJobById = async (id: string, updatedData: UpdateJobDto) => {
  if (!updatedData || Object.keys(updatedData).length === 0) {
    throw new AppError("No update provided", 400);
  }

  const existingJob = await jobRepository.getJobById(id);

  if (!existingJob) {
    throw new AppError("Job not found", 404);
  }

  const updatedJob = await jobRepository.updateJobById(id, updatedData);

  await auditRepository.createAuditLog({
    entity_type: "job",
    entity_id: id,
    action: "UPDATE",
    old_value: existingJob,
    new_value: updatedJob,
  });

  return updatedJob;
};

const deleteJobById = async (id: string) => {
  const existingJob = await jobRepository.getJobById(id);

  if (!existingJob) {
    throw new AppError("Job not found", 404);
  }

  const deletedJob = await jobRepository.deleteJobById(id);

  await auditRepository.createAuditLog({
    entity_type: "job",
    entity_id: id,
    action: "DELETE",
    old_value: existingJob,
    new_value: deletedJob,
  });

  return deletedJob;
};

module.exports = {
  getJobs,
  createJob,
  updateJobById,
  deleteJobById,
};
