const express = require("express");
const router = express.Router();

const { getTechnicians, clockIn } = require("./workshop.controller");
const { validateBody } = require("../../middleware/validate.middleware");
const { clockInSchema } = require("../../schemas/workshop.schema");

router.get("/technicians", getTechnicians);
router.post("/clock-in", validateBody(clockInSchema), clockIn);

module.exports = router;
