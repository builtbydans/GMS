const express = require("express");
const router = express.Router();

const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("./job.controller");

router.get("/", getJobs);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
