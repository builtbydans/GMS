const express = require("express");
const router = express.Router();

const { createLead, getLeads } = require("./lead.controller");

router.get("/", getLeads);
router.post("/", createLead);

module.exports = router;
