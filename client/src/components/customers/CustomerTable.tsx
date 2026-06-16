import Link from "next/link";
import { Button } from "../ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CustomerData } from "@/types/customer.types";

interface CustomerTableProps {
  customers: CustomerData[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
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
            <TableHead className="font-semibold text-slate-900 dark:text-slate-50">
              View Customers
            </TableHead>
            <TableHead className="font-semibold text-slate-900 dark:text-slate-50">
              Edit Customer
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-slate-500"
              >
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer, index) => (
              <TableRow
                key={index}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
              >
                <TableCell className="font-medium">
                  {customer.first_name}
                </TableCell>
                <TableCell className="font-medium">
                  {customer.last_name}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  {customer.email}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  {customer.phone}
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  <Button asChild variant="outline">
                    <Link href={`/customers/${customer.id}`}>View</Link>
                  </Button>
                </TableCell>
                <TableCell className="text-slate-600 dark:text-slate-400">
                  <Button asChild variant="outline">
                    <Link href={`/customers/${customer.id}/edit`}>
                      Edit Customer
                    </Link>
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
