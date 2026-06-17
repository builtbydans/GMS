import { Request, Response, NextFunction } from "express";
const invoiceService = require("./invoice.service");

const getInvoices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoices = await invoiceService.getInvoices();

    return res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    next(error);
  }
};

const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const invoiceData = req.body;

    const newInvoice = await invoiceService.createInvoice(invoiceData);

    return res.status(201).json({
      success: true,
      data: newInvoice,
    });
  } catch (error) {
    next(error);
  }
};

const updateInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const updatedInvoiceData = req.body;
    const updatedInvoice = await invoiceService.updateInvoiceById(
      id,
      updatedInvoiceData,
    );

    return res.status(200).json({
      success: true,
      data: updatedInvoice,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInvoices,
  createInvoice,
  updateInvoice,
};
