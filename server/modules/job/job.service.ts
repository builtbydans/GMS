const jobRepository = require("./job.repository");
const auditRepository = require("../audit/audit.repository");
const jobUpdateService = require("../job/updates/job-update.service");
const AppError = require("../../errors/AppError");
import { CreateJobDto, UpdateJobDto } from "../../types/job.types";
import { QuoteLeadDto } from "../../types/lead.types";
import {
  JOB_STATUS,
  JOB_TRANSITIONS,
  JobStatus,
} from "../../constants/job-status";

const validateStatusTransition = (
  currentStatus: string,
  nextStatus: JobStatus,
) => {
  const allowedTransitions = JOB_TRANSITIONS[currentStatus as JobStatus] ?? [];

  if (!allowedTransitions.includes(nextStatus)) {
    throw new AppError(
      `Invalid job status transition: ${currentStatus} -> ${nextStatus}`,
      400,
    );
  }
};

const getJobs = async () => {
  return await jobRepository.getJobs();
};

const getJobById = async (id: string) => {
  const job = await jobRepository.getJobById(id);

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  const updates = await jobUpdateService.getJobUpdatesByJobId(id);

  return { ...job, updates };
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

  validateStatusTransition(existingLead.status, JOB_STATUS.QUOTED);

  if (!data.job_type?.trim()) {
    throw new AppError("Job type is required", 400);
  }

  if (data.quoted_cost <= 0) {
    throw new AppError("Quoted cost must be greater than 0", 400);
  }

  const updatedLead = await jobRepository.quoteLead(id, data);
  await jobUpdateService.createWorkflowUpdate(id, JOB_STATUS.QUOTED);

  return updatedLead;
};

const markLeadAsLost = async (id: string) => {
  const lead = await jobRepository.getLeadById(id);

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }

  if (lead.status === JOB_STATUS.LOST) {
    throw new AppError("Lead is already marked as lost", 400);
  }

  validateStatusTransition(lead.status, JOB_STATUS.LOST);

  const updatedLead = await jobRepository.markLeadAsLost(id);
  await jobUpdateService.createWorkflowUpdate(id, JOB_STATUS.LOST);

  return updatedLead;
};

const acceptQuote = async (id: string) => {
  const lead = await jobRepository.getLeadById(id);

  if (!lead) {
    throw new AppError("Lead not found", 404);
  }

  validateStatusTransition(lead.status, JOB_STATUS.AWAITING_DEPOSIT);

  const updatedLead = await jobRepository.acceptQuote(id);
  await jobUpdateService.createWorkflowUpdate(id, JOB_STATUS.AWAITING_DEPOSIT);

  return updatedLead;
};

const confirmDeposit = async (id: string) => {
  const job = await jobRepository.getJobById(id);

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  validateStatusTransition(job.status, JOB_STATUS.BOOKED);

  const updatedJob = await jobRepository.confirmDeposit(id);
  await jobUpdateService.createWorkflowUpdate(id, JOB_STATUS.BOOKED);

  return updatedJob;
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

  if (updatedData.status !== undefined) {
    validateStatusTransition(existingJob.status, updatedData.status);
  }

  if (updatedData.status) {
    await jobUpdateService.createWorkflowUpdate(id, updatedData.status);
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

const startJob = async (id: string) => {
  const job = await jobRepository.getJobById(id);

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  validateStatusTransition(job.status, JOB_STATUS.IN_PROGRESS);

  const updatedJob = await jobRepository.startJob(id);

  await jobUpdateService.createWorkflowUpdate(id, JOB_STATUS.IN_PROGRESS);

  await auditRepository.createAuditLog({
    entity_type: "job",
    entity_id: id,
    action: "START",
    old_value: job,
    new_value: updatedJob,
  });

  return updatedJob;
};

const completeJob = async (id: string) => {
  const job = await jobRepository.getJobById(id);

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  validateStatusTransition(job.status, JOB_STATUS.COMPLETED);

  const updatedJob = await jobRepository.completeJob(id);

  await jobUpdateService.createWorkflowUpdate(id, JOB_STATUS.COMPLETED);

  await auditRepository.createAuditLog({
    entity_type: "job",
    entity_id: id,
    action: "COMPLETE",
    old_value: job,
    new_value: updatedJob,
  });

  return updatedJob;
};

module.exports = {
  getJobs,
  getJobById,
  getLeads,
  getLeadById,
  quoteLead,
  acceptQuote,
  confirmDeposit,
  createJob,
  updateJobById,
  deleteJobById,
  markLeadAsLost,
  startJob,
  completeJob,
};
