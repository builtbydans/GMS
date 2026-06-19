"use client";

import { markLeadAsLost } from "@/services/lead.service";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface MarkLeadLostProps {
  leadId: string;
}

const MarkLeadLostButton = ({ leadId }: MarkLeadLostProps) => {
  const router = useRouter();

  const handleClick = async () => {
    await markLeadAsLost(leadId);
    router.refresh();
  };

  return (
    <Button variant="destructive" onClick={handleClick}>
      Mark As Lost
    </Button>
  );
};

export default MarkLeadLostButton;
