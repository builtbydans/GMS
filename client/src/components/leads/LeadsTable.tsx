import Link from "next/link";
import { Button } from "../ui/button";

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
  return (
    <div className="w-full rounded-md border border-slate-200 dark:border-slate-800">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-900">
            <TableHead>Job Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-slate-500"
              >
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
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
                    {lead.vehicles.registration}
                  </div>
                </TableCell>

                <TableCell>{lead.status}</TableCell>

                <TableCell>
                  {new Date(lead.created_at).toLocaleDateString("en-GB")}
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
