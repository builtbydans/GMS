const jobRepository = require("./jobRepository");
const auditRepository = require("../audit/auditRepository");
const AppError = require("../../errors/AppError");

const getJobs = async () => {
  return jobRepository.getJobs();
};

const createJob = async (jobData: any) => {
  let {
    vehicle_id,
    job_number,
    title,
    description,
    status,
    estimated_cost,
    actual_cost,
  } = jobData;

  title = title?.trim();

  description = description?.trim();

  status = status?.trim().toUpperCase() || "BOOKED";

  if (!vehicle_id) {
    throw new AppError("Vehicle ID is required", 400);
  }

  if (!job_number) {
    throw new AppError("Job number is required", 400);
  }

  if (!title) {
    throw new AppError("Title is required", 400);
  }

  if (estimated_cost !== undefined && estimated_cost < 0) {
    throw new AppError("Estimated cost cannot be negative", 400);
  }

  if (actual_cost !== undefined && actual_cost < 0) {
    throw new AppError("Actual cost cannot be negative", 400);
  }

  const job = await jobRepository.createJob({
    vehicle_id,
    job_number,
    title,
    description,
    status,
    estimated_cost,
    actual_cost,
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

const updateJobById = async (id: string, updatedData: any) => {
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
