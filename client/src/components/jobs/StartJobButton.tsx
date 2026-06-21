"use client";

import { startJob } from "@/services/job.service";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface StartButtonProps {
  jobId: string;
}

const StartJobButton = ({ jobId }: StartButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    await startJob(jobId);
    router.refresh();
  };

  return (
    <Button className="w-full mt-5" size="lg" onClick={handleClick}>
      Start Job
    </Button>
  );
};

export default StartJobButton;
