"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import StatusBadge from "@/components/StatusBadge";

import { formatRelativeDate } from "@/utils/date";
import { formatRegistration } from "@/utils/formatRegistration";

import { JobSummaryDto } from "@/types/jobs.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface JobsTableProps {
  jobs: JobSummaryDto[];
}

export function JobsTable({ jobs }: JobsTableProps) {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredJobs =
    statusFilter === "ALL"
      ? jobs
      : jobs.filter((job) => job.status === statusFilter);

  return (
    <div className="w-full rounded-md border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "ALL" ? "default" : "outline"}
            onClick={() => setStatusFilter("ALL")}
          >
            All
          </Button>

          <Button
            variant={statusFilter === "BOOKED" ? "default" : "outline"}
            onClick={() => setStatusFilter("BOOKED")}
          >
            Booked
          </Button>

          <Button
            variant={statusFilter === "IN_PROGRESS" ? "default" : "outline"}
            onClick={() => setStatusFilter("IN_PROGRESS")}
          >
            In Progress
          </Button>

          <Button
            variant={statusFilter === "COMPLETED" ? "default" : "outline"}
            onClick={() => setStatusFilter("COMPLETED")}
          >
            Completed
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-gray-900">
            <TableHead>Job Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-slate-500"
              >
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job) => (
              <TableRow
                key={job.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
              >
                <TableCell className="font-medium">{job.job_number}</TableCell>

                <TableCell>
                  {job.vehicles.customers.first_name}{" "}
                  {job.vehicles.customers.last_name}
                </TableCell>

                <TableCell>
                  {job.vehicles.make} {job.vehicles.model}
                  <div className="text-xs text-slate-500">
                    {formatRegistration(job.vehicles.registration)}
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge status={job.status} />
                </TableCell>

                <TableCell>
                  <span suppressHydrationWarning>
                    {formatRelativeDate(job.created_at)}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <Button asChild size="sm">
                    <Link href={`/jobs/${job.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
