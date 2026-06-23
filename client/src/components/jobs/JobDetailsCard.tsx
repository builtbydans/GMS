"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

import StatusBadge from "@/components/StatusBadge";

import { formatRegistration } from "@/utils/formatRegistration";
import { formatRelativeDate } from "@/utils/date";
import StartJobButton from "./StartJobButton";
import { JobSummaryDto } from "@/types/jobs.types";
import CompleteJobButton from "./CompleteJobButton";

interface JobDetailsProps {
  job: JobSummaryDto;
}

const JobDetailsCard = ({ job }: JobDetailsProps) => {
  return (
    <div className="mx-auto max-w-5xl p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{job.job_number}</h1>

          <p className="text-muted-foreground">Workshop Job Details</p>
        </div>

        <StatusBadge status={job.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>
              <strong>Name:</strong> {job.vehicles.customers.first_name}{" "}
              {job.vehicles.customers.last_name}
            </p>

            <p>
              <strong>Email:</strong> {job.vehicles.customers.email}
            </p>

            <p>
              <strong>Phone:</strong> {job.vehicles.customers.phone}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>
              <strong>Vehicle:</strong> {job.vehicles.make} {job.vehicles.model}
            </p>

            <p>
              <strong>Registration:</strong>{" "}
              {formatRegistration(job.vehicles.registration)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>
              <strong>Job Type:</strong> {job.job_type}
            </p>

            <p>
              <strong>Status:</strong> {job.status}
            </p>

            <p>
              <strong>Quoted Cost:</strong> £
              {Number(job.quoted_cost).toFixed(2)}
            </p>

            <p>
              <strong>Actual Cost:</strong>{" "}
              {job.actual_cost
                ? `£${Number(job.actual_cost).toFixed(2)}`
                : "Not yet recorded"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Notes</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-wrap">
              {job.description || "No notes added."}
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        {job.status === "BOOKED" && <StartJobButton jobId={job.id} />}

        {job.status === "IN_PROGRESS" && (
          <Alert className="mt-5 border-green-200 bg-green-50 text-green-900">
            <AlertTitle>Work Started</AlertTitle>
            <AlertDescription className="text-green-700">
              This job was started {formatRelativeDate(job.updated_at)} by
              Danish.
            </AlertDescription>
          </Alert>
        )}
        {job.status === "IN_PROGRESS" && <CompleteJobButton jobId={job.id} />}
        {job.status === "COMPLETED" && (
          <Alert className="mt-5 border-green-200 bg-green-50 text-green-900">
            <AlertTitle>Work Completed</AlertTitle>
            <AlertDescription className="text-green-700">
              This job was completed {formatRelativeDate(job.updated_at)} by
              Danish.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default JobDetailsCard;
