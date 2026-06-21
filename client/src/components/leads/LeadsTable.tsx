"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import StatusBadge from "./StatusBadge";

import { formatRelativeDate } from "@/utils/date";
import { formatRegistration } from "@/utils/formatRegistration";

import { LeadSummaryDto } from "@/types/lead.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeadsTableProps {
  leads: LeadSummaryDto[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredLeads =
    statusFilter === "ALL"
      ? leads
      : leads.filter((lead) => lead.status === statusFilter);

  return (
    <div className="w-full rounded-md border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between p-4">
        <Button asChild>
          <Link href="/leads/new">+ New Lead</Link>
        </Button>

        <div className="flex gap-2">
          <Button
            variant={statusFilter === "ALL" ? "default" : "outline"}
            onClick={() => setStatusFilter("ALL")}
          >
            All
          </Button>

          <Button
            variant={statusFilter === "LEAD" ? "default" : "outline"}
            onClick={() => setStatusFilter("LEAD")}
          >
            Leads
          </Button>

          <Button
            variant={statusFilter === "QUOTED" ? "default" : "outline"}
            onClick={() => setStatusFilter("QUOTED")}
          >
            Quoted
          </Button>

          <Button
            variant={statusFilter === "LOST" ? "default" : "outline"}
            onClick={() => setStatusFilter("LOST")}
          >
            Lost
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
          {filteredLeads.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-slate-500"
              >
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            filteredLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
              >
                <TableCell className="font-medium">{lead.job_number}</TableCell>

                <TableCell>
                  {lead.vehicles.customers.first_name}{" "}
                  {lead.vehicles.customers.last_name}
                </TableCell>

                <TableCell>
                  {lead.vehicles.make} {lead.vehicles.model}
                  <div className="text-xs text-slate-500">
                    {formatRegistration(lead.vehicles.registration)}
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>

                <TableCell>
                  <span suppressHydrationWarning>
                    {formatRelativeDate(lead.created_at)}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <Button asChild size="sm">
                    <Link href={`/leads/${lead.id}`}>View</Link>
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
