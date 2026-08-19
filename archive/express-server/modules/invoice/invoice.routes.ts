const express = require("express");
const router = express.Router();

const {
  getInvoices,
  getInvoiceById,
  getInvoiceByJobId,
  createInvoice,
  issueInvoice,
  markInvoicePaid,
  voidInvoice,
  downloadInvoicePdf,
} = require("./invoice.controller");
const { validateBody } = require("../../middleware/validate.middleware");
const {
  generateInvoiceSchema,
} = require("../../schemas/invoice.schema");

router.get("/", getInvoices);
router.get("/job/:jobId", getInvoiceByJobId);
router.get("/:id/pdf", downloadInvoicePdf);
router.get("/:id", getInvoiceById);
router.post("/", validateBody(generateInvoiceSchema), createInvoice);
router.post("/:id/issue", issueInvoice);
router.post("/:id/pay", markInvoicePaid);
router.post("/:id/void", voidInvoice);

module.exports = router;
