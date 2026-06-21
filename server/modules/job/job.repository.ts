const supabase = require("../../config/db/supabase");
const AppError = require("../../errors/AppError");
import { QuoteLeadDto } from "../../types/lead.types";

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
    .in("status", ["BOOKED", "IN_PROGRESS", "COMPLETED"])
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
    .in("status", ["LEAD", "LOST", "QUOTED"])
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
      status: "QUOTED",
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
      status: "LOST",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

const bookLead = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: "BOOKED",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

const createJob = async (jobData: any) => {
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

const updateJobById = async (id: string, updatedData: any) => {
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

const startJob = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: "IN_PROGRESS",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

const completeJob = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({
      status: "COMPLETED",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
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
  quoteLead,
  bookLead,
  createJob,
  updateJobById,
  deleteJobById,
  markLeadAsLost,
  startJob,
  completeJob,
};
