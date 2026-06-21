"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  acceptQuote,
  markLeadAsLost,
  confirmDeposit,
} from "@/services/lead.service";
import { formatRegistration } from "@/utils/formatRegistration";
import { LeadSummaryDto } from "@/types/lead.types";

interface CustomerQuoteCardProps {
  job: LeadSummaryDto;
}

const CustomerQuoteCard = ({ job }: CustomerQuoteCardProps) => {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [depositPaid, setDepositPaid] = useState(job.status === "BOOKED");

  const handleAccept = async () => {
    await acceptQuote(job.id);
    setAccept(true);
  };

  const handleReject = async () => {
    await markLeadAsLost(job.id);
    setReject(true);
  };

  const handleDepositPayment = async () => {
    await confirmDeposit(job.id);
    setDepositPaid(true);
  };

  const depositAmount = ((job.quoted_cost ?? 0) * 0.1).toFixed(2);

  return (
    <div>
      <h1>CUSTOMER QUOTE PAGE</h1>
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
        {accept && !depositPaid && (
          <div className="mt-6 rounded-lg border p-6">
            <h2 className="text-xl font-bold">Quote Accepted</h2>

            <p className="mt-2">
              To secure your booking we require a 10% deposit.
            </p>

            <p className="mt-4 text-3xl font-bold">£{depositAmount}</p>

            <p className="mt-2 text-sm text-slate-500">
              This deposit will be deducted from your final invoice.
            </p>

            <Button className="mt-4" onClick={handleDepositPayment}>
              Mock Pay Deposit
            </Button>
          </div>
        )}
        {depositPaid && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6">
            <h2 className="text-xl font-bold text-green-700">
              Booking Confirmed
            </h2>

            <p className="mt-3 text-black">
              Thank you for your deposit payment.
            </p>

            <p className="mt-2 text-black">
              Your booking has now been confirmed and your vehicle has been
              added to our workshop queue.
            </p>

            <p className="mt-2 text-black">
              A member of our team will contact you shortly to arrange a
              suitable drop-off date and time.
            </p>

            <p className="mt-4 text-sm text-slate-600">
              Deposit paid: £{depositAmount}
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
