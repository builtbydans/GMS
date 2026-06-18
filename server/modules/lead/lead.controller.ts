import { Request, Response, NextFunction } from "express";

const leadService = require("./lead.service");

const getLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await leadService.getLeads();

    return res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leadData = req.body;
    const lead = await leadService.createLead(leadData);

    return res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLeads,
};
