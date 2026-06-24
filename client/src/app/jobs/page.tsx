import { getJobs } from "@/app/services/job.service";
import { JobsTable } from "@/components/jobs/JobsTable";

const JobsPage = async () => {
  const jobs = await getJobs();

  return (
    <div className="p-5">
      <JobsTable jobs={jobs} />
    </div>
  );
};

export default JobsPage;
