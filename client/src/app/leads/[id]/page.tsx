import { getLeadById } from "@/services/lead.service";
import { LeadDetailsCard } from "@/components/leads/LeadDetailsCard";

interface LeadPageProps {
  params: Promise<{
    id: string;
  }>;
}

const LeadPage = async ({ params }: LeadPageProps) => {
  const { id } = await params;

  const lead = await getLeadById(id);

  return (
    <div className="space-y-6">
      <LeadDetailsCard lead={lead} />
    </div>
  );
};

export default LeadPage;
