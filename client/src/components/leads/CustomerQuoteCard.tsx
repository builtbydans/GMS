"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { bookLead, markLeadAsLost } from "@/services/lead.service";
import { formatRegistration } from "@/utils/formatRegistration";
import { LeadSummaryDto } from "@/types/lead.types";

interface CustomerQuoteCardProps {
  job: LeadSummaryDto;
}

const CustomerQuoteCard = ({ job }: CustomerQuoteCardProps) => {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  const handleAccept = async () => {
    await bookLead(job.id);
    setAccept(true);
  };

  const handleReject = async () => {
    await markLeadAsLost(job.id);
    setReject(true);
  };

  return (
    <div>
      {" "}
      <div className="mt-6 rounded-lg border p-6">
        <h1 className="text-3xl font-bold">
          New Quote for {formatRegistration(job.vehicles.registration)}
        </h1>

        <div className="mt-4 space-y-2">
          <p>
            Hi {job.vehicles.customers.first_name}{" "}
            {job.vehicles.customers.last_name}
          </p>
          <p>A new quote has been generated for your recent enquiry.</p>
          <p>Job Type: {job.job_type}</p>
          <p>Quoted Cost: £{job.quoted_cost}</p>
          <p>Estimated Time To Complete: 2 Working Days</p>
          {!accept && !reject && (
            <div className="flex gap-1.5">
              <Button onClick={handleAccept} variant="outline">
                Accept Quote
              </Button>
              <Button onClick={handleReject} variant="destructive">
                Reject Quote
              </Button>
            </div>
          )}
        </div>
        {accept && (
          <div>
            <p>
              Thank you for accepting your quote. Please drop your vehicle on
              23rd June 2026 by 8AM
            </p>
          </div>
        )}
        {reject && (
          <div>
            <p>
              We are sorry that you are not happy with your current quote. We
              run a very competitive business and all prices reflect industry
              standards. Your details will be stored in the event that you
              change your mind. If you wish to opt-out or discuss your quote
              with a member of our team, please contact us on: 0209 999 999.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerQuoteCard;
