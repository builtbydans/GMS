import "server-only";

import { apiFetch } from "@/lib/api.server";
import { createInvoiceService } from "@/services/invoice.api";

export const { getInvoices, getInvoiceById, getInvoiceByJobId } =
  createInvoiceService(apiFetch);
