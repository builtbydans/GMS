const supabase = require("../../config/db/supabase");
const AppError = require("../../errors/AppError");

const getJobs = async () => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .is("deleted_at", null);

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
    .eq("status", "LEAD");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getJobById = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

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

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJobById,
  deleteJobById,
  getLeads,
};
