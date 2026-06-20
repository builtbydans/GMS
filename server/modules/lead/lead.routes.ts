const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  quoteLead,
  markLeadAsLost,
  bookLead,
} = require("./lead.controller");

router.get("/", getLeads);
router.get("/:id", getLeadById);

router.post("/", createLead);

router.patch("/:id/quote", quoteLead);
router.patch("/:id/book", bookLead);
router.patch("/:id/lost", markLeadAsLost);

module.exports = router;
