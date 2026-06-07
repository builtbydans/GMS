const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
} = require("../controllers/customerController");

router.get("/", getCustomers);
router.get("/:id", getCustomerById);

router.post("/", createCustomer);

router.put("/:id", updateCustomerById);

module.exports = router;
