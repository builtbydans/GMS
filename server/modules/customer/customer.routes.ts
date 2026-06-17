const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} = require("./customer.controller");

router.get("/", getCustomers);
router.get("/:id", getCustomerById);

router.post("/", createCustomer);

router.put("/:id", updateCustomerById);

router.delete("/:id", deleteCustomerById);

module.exports = router;
