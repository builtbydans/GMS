const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  quoteLead,
  markLeadAsLost,
  acceptQuote,
} = require("./lead.controller");

const { validateBody } = require("../../middleware/validate.middleware");
const {
  createLeadSchema,
  quoteLeadSchema,
} = require("../../schemas/lead.schema");

router.get("/", getLeads);
router.get("/:id", getLeadById);

router.post("/", validateBody(createLeadSchema), createLead);

router.patch("/:id/quote", validateBody(quoteLeadSchema), quoteLead);
router.patch("/:id/accept", acceptQuote);
router.patch("/:id/lost", markLeadAsLost);

module.exports = router;
