import JobDetailsCard from "@/components/jobs/JobDetailsCard";
import { getJobById } from "@/services/job.service";

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const job = await getJobById(id);

  console.log(job);

  return (
    <>
      <JobDetailsCard job={job} />
    </>
  );
};

export default JobDetailsPage;
