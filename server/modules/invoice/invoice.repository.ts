import {
  CreateInvoiceData,
  UpdateInvoiceData,
} from "../../types/invoice.types";

const supabase = require("../../config/db/supabase");

const getInvoices = async () => {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getInvoiceById = async (id: string) => {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getInvoiceByJobId = async (jobId: string) => {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("job_id", jobId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const createInvoice = async (invoiceData: CreateInvoiceData) => {
  const { data, error } = await supabase
    .from("invoices")
    .insert(invoiceData)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateInvoiceById = async (
  id: string,
  updatedData: UpdateInvoiceData,
) => {
  const { data, error } = await supabase
    .from("invoices")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  getInvoices,
  getInvoiceById,
  getInvoiceByJobId,
  createInvoice,
  updateInvoiceById,
};
