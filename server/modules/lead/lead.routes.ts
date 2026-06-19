const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  quoteLead,
} = require("./lead.controller");

router.get("/", getLeads);
router.get("/:id", getLeadById);

router.post("/", createLead);

router.patch("/:id/quote", quoteLead);

module.exports = router;
