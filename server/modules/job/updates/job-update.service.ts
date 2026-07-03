const jobUpdateRepository = require("./job-update.repository");

import { JobStatus, JOB_STATUS_MESSAGES } from "../../../constants/job-status";

const createWorkflowUpdate = async (jobId: string, status: JobStatus) => {
  const message = JOB_STATUS_MESSAGES[status];

  return await jobUpdateRepository.createJobUpdate({
    job_id: jobId,
    message,
  });
};

const getJobUpdatesByJobId = async (jobId: string) => {
  return await jobUpdateRepository.getJobUpdatesByJobId(jobId);
};

module.exports = {
  createWorkflowUpdate,
  getJobUpdatesByJobId,
};
