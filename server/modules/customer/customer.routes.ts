const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} = require("./customer.controller");

const { validateBody } = require("../../middleware/validate.middleware");
const {
  createCustomerSchema,
  updateCustomerSchema,
} = require("../../schemas/customer.schema");

router.get("/", getCustomers);
router.get("/:id", getCustomerById);

router.post("/", validateBody(createCustomerSchema), createCustomer);

router.put("/:id", validateBody(updateCustomerSchema), updateCustomerById);

router.delete("/:id", deleteCustomerById);

module.exports = router;
