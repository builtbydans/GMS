"use client";

import { completeJob } from "@/services/job.service";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface CompleteButtonProps {
  jobId: string;
}

const CompleteJobButton = ({ jobId }: CompleteButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    await completeJob(jobId);
    router.refresh();
  };

  return (
    <Button className="w-full mt-5" size="lg" onClick={handleClick}>
      Complete Job
    </Button>
  );
};

export default CompleteJobButton;
