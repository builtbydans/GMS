import CustomerQuoteCard from "@/components/leads/CustomerQuoteCard";
import { getLeadById } from "@/services/lead.service";

interface Props {
  params: Promise<{ jobId: string }>;
}

const JobQuotesPage = async ({ params }: Props) => {
  const { jobId } = await params;
  const job = await getLeadById(jobId);

  if (!job) {
    return <div>This job does not exist</div>;
  }

  if (job.quoted_cost === null) {
    return <div>This job has not yet been quoted</div>;
  }

  if (job.status === "BOOKED") {
    return <CustomerQuoteCard job={job} />;
  }

  return (
    <div>
      <CustomerQuoteCard job={job} />
    </div>
  );
};

export default JobQuotesPage;
