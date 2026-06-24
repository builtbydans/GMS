"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CarFront,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  LoaderCircle,
  Mail,
  Phone,
  UserRound,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import {
  completeJob,
  startJob,
  updateJobStatus,
} from "@/app/services/job.service";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  JOB_STATUS,
  JOB_TRANSITIONS,
  JobStatus,
  WORKSHOP_STATUS_SEQUENCE,
  formatJobStatus,
} from "@/constants/job-status";
import { cn } from "@/lib/utils";
import { JobSummaryDto } from "@/types/job.types";
import { formatRelativeDate } from "@/utils/date";
import { formatRegistration } from "@/utils/formatRegistration";

import ActivityTimeline from "./ActivityTimeline";

interface JobDetailsProps {
  job: JobSummaryDto;
}

const transitionCopy: Partial<
  Record<JobStatus, { label: string; description: string }>
> = {
  [JOB_STATUS.AWAITING_PARTS]: {
    label: "Mark as awaiting parts",
    description: "Pause workshop progress until the required parts arrive.",
  },
  [JOB_STATUS.IN_PROGRESS]: {
    label: "Start job",
    description: "Move the vehicle into active workshop work.",
  },
  [JOB_STATUS.AWAITING_REVIEW]: {
    label: "Send for review",
    description: "Work is ready for an internal review.",
  },
  [JOB_STATUS.FINAL_INSPECTION]: {
    label: "Begin final inspection",
    description: "Move the vehicle into its final quality inspection.",
  },
  [JOB_STATUS.READY_FOR_COLLECTION]: {
    label: "Ready for collection",
    description: "Confirm that the vehicle can be collected by the customer.",
  },
  [JOB_STATUS.COMPLETED]: {
    label: "Complete job",
    description: "Close the workshop job after customer collection.",
  },
};

const getWorkshopProgress = (status: JobStatus) => {
  if (status === JOB_STATUS.AWAITING_PARTS) {
    return WORKSHOP_STATUS_SEQUENCE.indexOf(JOB_STATUS.BOOKED);
  }

  return WORKSHOP_STATUS_SEQUENCE.indexOf(
    status as (typeof WORKSHOP_STATUS_SEQUENCE)[number],
  );
};

const JobDetailsCard = ({ job }: JobDetailsProps) => {
  const router = useRouter();
  const [pendingStatus, setPendingStatus] = useState<JobStatus | null>(null);

  const allowedTransitions = JOB_TRANSITIONS[job.status] ?? [];
  const progressIndex = getWorkshopProgress(job.status);
  const isWorkshopJob = progressIndex >= 0;

  const handleTransition = async (nextStatus: JobStatus) => {
    setPendingStatus(nextStatus);

    try {
      if (nextStatus === JOB_STATUS.IN_PROGRESS) {
        await startJob(job.id);
      } else if (nextStatus === JOB_STATUS.COMPLETED) {
        await completeJob(job.id);
      } else {
        await updateJobStatus(job.id, nextStatus);
      }

      toast.success(`Job moved to ${formatJobStatus(nextStatus)}`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update job status",
      );
    } finally {
      setPendingStatus(null);
    }
  };

  return (
    <div className="grid gap-6 px-15 py-5 xl:grid-cols-[minmax(0)_22rem]">
      <main className="min-w-0 space-y-6">
        <Card className="overflow-hidden">
          <div className="border-b bg-muted/35 px-6 py-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={job.status} />
                  <span className="text-sm text-muted-foreground">
                    {job.job_number}
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {job.job_type || "Workshop job"}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatRegistration(job.vehicles.registration)} ·{" "}
                    {job.vehicles.make} {job.vehicles.model}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" />
                Updated {formatRelativeDate(job.updated_at)}
              </div>
            </div>
          </div>

          {isWorkshopJob && (
            <CardContent className="px-6 py-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium">Workshop progress</p>
                <p className="text-xs text-muted-foreground">
                  {Math.max(progressIndex + 1, 1)} of{" "}
                  {WORKSHOP_STATUS_SEQUENCE.length} stages
                </p>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="flex min-w-[52rem] items-start">
                  {WORKSHOP_STATUS_SEQUENCE.map((status, index) => {
                    const isCurrent = status === job.status;
                    const isComplete = index < progressIndex;

                    return (
                      <div
                        className="mt-3 flex flex-1 items-start last:flex-none"
                        key={status}
                      >
                        <div className="flex w-24 flex-col items-center text-center">
                          <div
                            className={cn(
                              "flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground",
                              isComplete &&
                                "border-primary bg-primary text-primary-foreground",
                              isCurrent &&
                                "border-primary ring-4 ring-primary/10 text-primary",
                            )}
                          >
                            {isComplete ? (
                              <Check className="size-4" />
                            ) : (
                              <span className="text-xs font-semibold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <span
                            className={cn(
                              "mt-2 text-[11px] leading-tight text-muted-foreground",
                              isCurrent && "font-semibold text-foreground",
                            )}
                          >
                            {formatJobStatus(status)}
                          </span>
                        </div>

                        {index < WORKSHOP_STATUS_SEQUENCE.length - 1 && (
                          <div
                            className={cn(
                              "mt-4 h-px min-w-4 flex-1 bg-border",
                              isComplete && "bg-primary",
                            )}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-4 text-muted-foreground" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">
                  {job.vehicles.customers.first_name}{" "}
                  {job.vehicles.customers.last_name}
                </p>
                <p className="text-sm text-muted-foreground">Vehicle owner</p>
              </div>
              <div className="grid gap-2 text-sm">
                <a
                  className="flex items-center gap-2 hover:underline"
                  href={`mailto:${job.vehicles.customers.email}`}
                >
                  <Mail className="size-4 text-muted-foreground" />
                  {job.vehicles.customers.email}
                </a>
                <a
                  className="flex items-center gap-2 hover:underline"
                  href={`tel:${job.vehicles.customers.phone}`}
                >
                  <Phone className="size-4 text-muted-foreground" />
                  {job.vehicles.customers.phone}
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CarFront className="size-4 text-muted-foreground" />
                Vehicle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">
                  {job.vehicles.make} {job.vehicles.model}
                </p>
                <p className="text-sm text-muted-foreground">
                  Customer vehicle
                </p>
              </div>
              <div className="inline-flex rounded-md border bg-muted/40 px-3 py-1.5 font-mono text-sm font-semibold tracking-wider">
                {formatRegistration(job.vehicles.registration)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="size-4 text-muted-foreground" />
                Job information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Job type
                </p>
                <p className="mt-1 text-sm font-medium">
                  {job.job_type || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Created
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <CalendarDays className="size-3.5" />
                  {formatRelativeDate(job.created_at)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Quoted cost
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <CircleDollarSign className="size-3.5" />£
                  {Number(job.quoted_cost ?? 0).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Actual cost
                </p>
                <p className="mt-1 text-sm font-medium">
                  {job.actual_cost
                    ? `£${Number(job.actual_cost).toFixed(2)}`
                    : "Not recorded"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="size-4 text-muted-foreground" />
                Job description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {job.description || "No job description has been added."}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Next action</CardTitle>
          </CardHeader>
          <CardContent>
            {allowedTransitions.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {allowedTransitions.map((nextStatus) => {
                  const copy = transitionCopy[nextStatus];
                  const isPending = pendingStatus === nextStatus;

                  return (
                    <button
                      className="group flex items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:border-foreground/20 hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={pendingStatus !== null}
                      key={nextStatus}
                      onClick={() => handleTransition(nextStatus)}
                      type="button"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {isPending ? (
                          <LoaderCircle className="size-5 animate-spin" />
                        ) : (
                          <ChevronRight className="size-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">
                          {copy?.label ?? formatJobStatus(nextStatus)}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {copy?.description ??
                            `Move this job to ${formatJobStatus(nextStatus)}.`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
                <CheckCircle2 className="size-5 text-emerald-600" />
                <div>
                  <p className="font-medium">
                    {job.status === JOB_STATUS.COMPLETED
                      ? "Workshop job completed"
                      : "No workshop action available"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last updated {formatRelativeDate(job.updated_at)}.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <aside className="space-y-4 xl:sticky xl:top-5 xl:self-start">
        <ActivityTimeline job={job} />

        {job.status === JOB_STATUS.COMPLETED && (
          <Card className="border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
            <CardContent className="flex gap-3 p-5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-medium">Work completed</p>
                <p className="mt-1 text-sm opacity-75">
                  Completed {formatRelativeDate(job.updated_at)}.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </aside>
    </div>
  );
};

export default JobDetailsCard;
