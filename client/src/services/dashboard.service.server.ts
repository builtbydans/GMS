import "server-only";

import { apiFetch } from "@/lib/api.server";
import { createDashboardService } from "@/services/dashboard.api";

export const { getDashboardStats } = createDashboardService(apiFetch);
