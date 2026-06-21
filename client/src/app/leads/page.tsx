import { getLeads } from "@/services/lead.service";
import { LeadsTable } from "@/components/leads/LeadsTable";

const LeadsPage = async () => {
  const leads = await getLeads();
  return (
    <div className="p-5">
      <LeadsTable leads={leads} />
    </div>
  );
};

export default LeadsPage;
