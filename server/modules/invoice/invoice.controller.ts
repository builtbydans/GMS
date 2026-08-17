import { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../types/auth.types";
const invoiceService = require("./invoice.service");
const invoicePdfService = require("./invoice-pdf.service");

const getInvoices = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoices = await invoiceService.getInvoices(req.auth.role);

    return res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    next(error);
  }
};

const createInvoice = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoice = await invoiceService.generateDraft(
      req.body,
      req.auth.role,
      req.auth.userId,
    );

    return res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

const getInvoiceById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoice = await invoiceService.getInvoiceById(
      req.params.id,
      req.auth.role,
    );

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

const getInvoiceByJobId = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoice = await invoiceService.getInvoiceByJobId(
      req.params.jobId,
      req.auth.role,
    );

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

const issueInvoice = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoice = await invoiceService.issueInvoice(
      req.params.id,
      req.auth.role,
      req.auth.userId,
    );

    return res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

const markInvoicePaid = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoice = await invoiceService.markInvoicePaid(
      req.params.id,
      req.auth.role,
      req.auth.userId,
    );

    return res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

const voidInvoice = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoice = await invoiceService.voidInvoice(
      req.params.id,
      req.auth.role,
      req.auth.userId,
    );

    return res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

const downloadInvoicePdf = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoice = await invoiceService.getInvoiceById(
      req.params.id,
      req.auth.role,
    );
    const pdf = await invoicePdfService.drawInvoicePdf(invoice);
    const filename = `${invoice.invoice_number || "invoice"}.pdf`.replace(
      /[^a-zA-Z0-9._-]/g,
      "-",
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", String(pdf.length));
    return res.status(200).send(pdf);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  getInvoiceByJobId,
  createInvoice,
  issueInvoice,
  markInvoicePaid,
  voidInvoice,
  downloadInvoicePdf,
};
