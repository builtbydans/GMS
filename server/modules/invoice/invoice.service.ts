const invoiceRepository = require("./invoice.repository");
const jobRepository = require("../job/job.repository");
const auditRepository = require("../audit/audit.repository");
const AppError = require("../../errors/AppError");

import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  UpdateInvoiceData,
} from "../../types/invoice.types";

const VAT_RATE = 20;
const VALID_STATUSES = ["DRAFT", "UNPAID", "PAID", "VOID"];

const getInvoices = async () => {
  return invoiceRepository.getInvoices();
};

const createInvoice = async (invoiceData: CreateInvoiceDto) => {
  const { job_id } = invoiceData;

  if (!job_id) {
    throw new AppError("Job ID is required", 400);
  }

  const job = await jobRepository.getJobById(job_id);

  if (!job) {
    throw new AppError("Job not found", 404);
  }

  if (job.actual_cost == null) {
    throw new AppError(
      "Job must have an actual cost before generating an invoice",
      400,
    );
  }

  const existingInvoice = await invoiceRepository.getInvoiceByJobId(job_id);

  if (existingInvoice) {
    throw new AppError("Invoice already exists for this job", 400);
  }

  const subtotal = Number(job.actual_cost);
  const discount = 0;
  const taxableAmount = subtotal - discount;
  const vat = Number(((taxableAmount * VAT_RATE) / 100).toFixed(2));
  const total = Number((taxableAmount + vat).toFixed(2));

  const invoice = await invoiceRepository.createInvoice({
    job_id,
    subtotal,
    discount,
    vat_rate: VAT_RATE,
    vat,
    total,
  });

  await auditRepository.createAuditLog({
    entity_type: "invoice",
    entity_id: invoice.id,
    action: "CREATE",
    old_value: null,
    new_value: invoice,
  });

  return invoice;
};

const updateInvoiceById = async (id: string, updatedData: UpdateInvoiceDto) => {
  if (!updatedData || Object.keys(updatedData).length === 0) {
    throw new AppError("No update data provided", 400);
  }

  const existingInvoice = await invoiceRepository.getInvoiceById(id);

  if (!existingInvoice) {
    throw new AppError("Invoice not found", 404);
  }

  if (existingInvoice.status === "PAID") {
    throw new AppError("Paid invoices cannot be modified", 400);
  }

  const sanitisedData: UpdateInvoiceData = {
    ...updatedData,
  };

  if (sanitisedData.status) {
    sanitisedData.status = sanitisedData.status.trim().toUpperCase();

    if (!VALID_STATUSES.includes(sanitisedData.status)) {
      throw new AppError("Invalid invoice status", 400);
    }
  }

  if (sanitisedData.subtotal !== undefined && sanitisedData.subtotal < 0) {
    throw new AppError("Subtotal cannot be negative", 400);
  }

  if (sanitisedData.discount !== undefined && sanitisedData.discount < 0) {
    throw new AppError("Discount cannot be negative", 400);
  }

  const subtotal = sanitisedData.subtotal ?? existingInvoice.subtotal;
  const discount = sanitisedData.discount ?? existingInvoice.discount;

  if (discount > subtotal) {
    throw new AppError("Discount cannot exceed subtotal", 400);
  }

  if (
    sanitisedData.subtotal !== undefined ||
    sanitisedData.discount !== undefined
  ) {
    const taxableAmount = subtotal - discount;

    sanitisedData.vat = Number(
      ((taxableAmount * existingInvoice.vat_rate) / 100).toFixed(2),
    );

    sanitisedData.total = Number(
      (taxableAmount + sanitisedData.vat).toFixed(2),
    );
  }

  const updatedInvoice = await invoiceRepository.updateInvoiceById(
    id,
    sanitisedData,
  );

  await auditRepository.createAuditLog({
    entity_type: "invoice",
    entity_id: id,
    action: "UPDATE",
    old_value: existingInvoice,
    new_value: updatedInvoice,
  });

  return updatedInvoice;
};

module.exports = {
  getInvoices,
  createInvoice,
  updateInvoiceById,
};
