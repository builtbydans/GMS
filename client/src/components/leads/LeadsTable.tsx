import Link from "next/link";
import { Button } from "../ui/button";

import { CreateLeadDto } from "@/types/lead.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeadsTableProps {
  leads: CreateLeadDto[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  console.log(JSON.stringify(leads, null, 2));
  return (
    <div className="w-full rounded-md border border-slate-200 dark:border-slate-800">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-900">
            <TableHead className="font-semibold text-slate-900 dark:text-slate-50">
              First Name
            </TableHead>
            <TableHead className="font-semibold text-slate-900 dark:text-slate-50">
              Last Name
            </TableHead>
            <TableHead className="font-semibold text-slate-900 dark:text-slate-50">
              Email
            </TableHead>
            <TableHead className="font-semibold text-slate-900 dark:text-slate-50">
              Phone Number
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-slate-500"
              >
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead, index) => (
              <TableRow
                key={index}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
              >
                <TableCell className="font-medium">{lead.first_name}</TableCell>
                <TableCell className="font-medium">{lead.last_name}</TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  {lead.email}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  {lead.phone}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
