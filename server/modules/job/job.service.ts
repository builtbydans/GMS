const jobRepository = require("./job.repository");
const auditRepository = require("../audit/audit.repository");
const AppError = require("../../errors/AppError");
import { CreateJobDto, UpdateJobDto } from "../../types/job.types";
import { QuoteLeadDto } from "../../types/lead.types";

const getJobs = async () => {
  return await jobRepository.getJobs();
};

const getLeads = async () => {
  return await jobRepository.getLeads();
};

const getLeadById = async (id: string) => {
  return await jobRepository.getLeadById(id);
};

const quoteLead = async (id: string, data: QuoteLeadDto) => {
  const existingLead = await jobRepository.getLeadById(id);

  if (!existingLead) {
    throw new AppError("Lead not found", 404);
  }

  if (existingLead.status !== "LEAD") {
    throw new AppError("Only leads can be converted to quotes", 400);
  }

  if (!data.job_type?.trim()) {
    throw new AppError("Job type is required", 400);
  }

  if (data.quoted_cost <= 0) {
    throw new AppError("Quoted cost must be greater than 0", 400);
  }

  return await jobRepository.quoteLead(id, data);
};

const markLeadAsLost = async (id: string) => {
  const lead = await jobRepository.getLeadById(id);

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }

  if (lead.status === "LOST") {
    throw new AppError("Lead is already marked as lost", 400);
  }

  const allowedStatuses = ["LEAD", "QUOTED"];

  if (!allowedStatuses.includes(lead.status)) {
    throw new AppError(`Cannot mark a ${lead.status} lead as lost`, 400);
  }

  return await jobRepository.markLeadAsLost(id);
};

const createJob = async (jobData: CreateJobDto) => {
  let { vehicle_id, job_type, description } = jobData;

  job_type = job_type?.trim();
  description = description?.trim();

  if (!vehicle_id) {
    throw new AppError("Vehicle ID is required", 400);
  }

  const job = await jobRepository.createJob({
    vehicle_id,
    description,
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
  getLeads,
  getLeadById,
  quoteLead,
  createJob,
  updateJobById,
  deleteJobById,
  markLeadAsLost,
};
