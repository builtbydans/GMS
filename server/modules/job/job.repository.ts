import supabase from "../../config/db/supabase";
const AppError = require("../../errors/AppError");
import { QuoteLeadDto } from "../../types/lead.types";

import {
  ACTIVE_JOB_STATUSES,
  JOB_STATUS,
  LEAD_STATUSES,
  JobStatus,
} from "../../constants/job-status";

import { CreateJobDto, UpdateJobDto } from "../../types/job.types";

const getJobs = async () => {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      vehicles (
        registration,
        make,
        model,
        customers (
          first_name,
          last_name
        )
      )
    `,
    )
    .is("deleted_at", null)
    .in("status", ACTIVE_JOB_STATUSES)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getJobById = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `*, vehicles (
          registration,
          make,
          model,
          customers (
            first_name,
            last_name,
            email,
            phone
          )
        )`,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getLeads = async () => {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
        *,
        vehicles (
          registration,
          make,
          model,
          customers (
            first_name,
            last_name
          )
        )
      `,
    )
    .is("deleted_at", null)
    .in("status", LEAD_STATUSES)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getLeadById = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      vehicles (
        registration,
        make,
        model,
        customers (
          first_name,
          last_name,
          email,
          phone
        )
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const quoteLead = async (id: string, data: QuoteLeadDto) => {
  const { data: updatedJob, error } = await supabase
    .from("jobs")
    .update({
      job_type: data.job_type,
      quoted_cost: data.quoted_cost,
      status: JOB_STATUS.QUOTED,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedJob;
};

const markLeadAsLost = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: JOB_STATUS.LOST,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

const acceptQuote = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: JOB_STATUS.AWAITING_DEPOSIT,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

const confirmDeposit = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: JOB_STATUS.BOOKED,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

const createJob = async (jobData: CreateJobDto) => {
  const { data, error } = await supabase
    .from("jobs")
    .insert(jobData)
    .select()
    .single();

  if (error) {
    throw new AppError(error.message, 500);
  }

  return data;
};

const updateJobById = async (id: string, updatedData: UpdateJobDto) => {
  const { data, error } = await supabase
    .from("jobs")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteJobById = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new AppError(error.message, 500);
  }

  return data;
};

const updateJobStatus = async (id: string, status: JobStatus) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select()
    .single();

  if (error) throw error;

  return data;
};

module.exports = {
  getJobs,
  getJobById,
  getLeads,
  getLeadById,
  confirmDeposit,
  quoteLead,
  acceptQuote,
  createJob,
  updateJobById,
  deleteJobById,
  markLeadAsLost,
  updateJobStatus,
};
