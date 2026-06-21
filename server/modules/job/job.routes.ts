const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  startJob,
  completeJob,
  confirmDeposit,
} = require("./job.controller");

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.delete("/:id", deleteJob);

router.patch("/:id/start", startJob);
router.patch("/:id", updateJob);
router.patch("/:id/complete", completeJob);
router.patch("/:id/confirm-deposit", confirmDeposit);

module.exports = router;
