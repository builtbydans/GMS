import { LeadSummaryDto } from "@/types/lead.types";
import { QuoteLeadForm } from "./QuoteLeadForm";
import StatusBadge from "./StatusBadge";
import { Button } from "../ui/button";
import MarkLeadLostButton from "./MarkLeadLostButton";
import Link from "next/link";

interface LeadDetailsCardProps {
  lead: LeadSummaryDto;
}

export const LeadDetailsCard = ({ lead }: LeadDetailsCardProps) => {
  return (
    <div className="rounded-lg border p-6 space-y-6">
      <div>
        <Button asChild>
          <Link href="/leads">Return to Leads</Link>
        </Button>

        {["LEAD", "QUOTED"].includes(lead.status) && (
          <MarkLeadLostButton leadId={lead.id} />
        )}
        <h1 className="text-2xl font-bold">{lead.job_number}</h1>

        <p className="text-sm text-muted-foreground">
          Created {new Date(lead.created_at).toLocaleDateString("en-GB")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-semibold mb-2">Customer</h2>

          <div>
            {lead.vehicles.customers.first_name}{" "}
            {lead.vehicles.customers.last_name}
          </div>

          <div>{lead.vehicles.customers.email}</div>

          <div>{lead.vehicles.customers.phone}</div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Vehicle</h2>

          <div>
            {lead.vehicles.make} {lead.vehicles.model}
          </div>

          <div>{lead.vehicles.registration}</div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Lead Details</h2>

        <div>
          <strong>Status:</strong> <StatusBadge status={lead.status} />
        </div>

        <div>
          <strong>Job Type:</strong> {lead.job_type ?? "Not Assigned"}
        </div>

        <div>
          <strong>Quoted Cost:</strong>{" "}
          {lead.quoted_cost ? `£${lead.quoted_cost}` : "Not Quoted"}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Customer Message</h2>

        <p className="whitespace-pre-wrap rounded-md border p-4 bg-muted/30">
          {lead.description}
        </p>
      </div>
      {lead.status === "LEAD" && <QuoteLeadForm leadId={lead.id} />}
    </div>
  );
};
