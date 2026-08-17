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
  assignTechnician,
  raiseToManager,
  acknowledgeRaise,
  resolveRaise,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem,
} = require("./job.controller");

const { validateBody } = require("../../middleware/validate.middleware");
const {
  transitionJobSchema,
  assignTechnicianSchema,
  raiseToManagerSchema,
  createWorkItemSchema,
  updateWorkItemSchema,
} = require("../../schemas/job.schema");

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.post(
  "/:id/transitions",
  validateBody(transitionJobSchema),
  transitionJob,
);
router.patch(
  "/:id/assignment",
  validateBody(assignTechnicianSchema),
  assignTechnician,
);
router.post("/:id/raises", validateBody(raiseToManagerSchema), raiseToManager);
router.post("/:id/raises/:raiseId/acknowledge", acknowledgeRaise);
router.post("/:id/raises/:raiseId/resolve", resolveRaise);
router.post(
  "/:id/work-items",
  validateBody(createWorkItemSchema),
  createWorkItem,
);
router.patch(
  "/:id/work-items/:itemId",
  validateBody(updateWorkItemSchema),
  updateWorkItem,
);
router.delete("/:id/work-items/:itemId", deleteWorkItem);
router.patch("/:id/confirm-deposit", confirmDeposit);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
