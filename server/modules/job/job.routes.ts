const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  confirmDeposit,
  transitionJob,
} = require("./job.controller");

const { validateBody } = require("../../middleware/validate.middleware");
const { transitionJobSchema } = require("../../schemas/job.schema");

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.post(
  "/:id/transitions",
  validateBody(transitionJobSchema),
  transitionJob,
);
router.patch("/:id/confirm-deposit", confirmDeposit);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
