const express = require("express");
const router = express.Router();

const {
  getInvoices,
  createInvoice,
  updateInvoice,
} = require("./invoiceController");

router.get("/", getInvoices);

router.post("/", createInvoice);

router.patch("/:id", updateInvoice);

module.exports = router;
