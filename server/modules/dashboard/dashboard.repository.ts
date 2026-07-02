import { DashboardStatsDto } from "../../types/dashboard.types";
import { JOB_STATUS } from "../../constants/job-status";

import supabase from "../../config/db/supabase";

const getDashboardStats = async (): Promise<DashboardStatsDto> => {
  const [
    customersResult,
    vehiclesResult,
    jobsResult,
    invoicesResult,
    leadsResult,
  ] = await Promise.all([
    supabase.from("customers").select("*", {
      count: "exact",
      head: true,
    }),
    supabase.from("vehicles").select("*", {
      count: "exact",
      head: true,
    }),
    supabase.from("jobs").select("*", {
      count: "exact",
      head: true,
    }),
    supabase.from("invoices").select("*", {
      count: "exact",
      head: true,
    }),
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .in("status", [JOB_STATUS.LEAD, JOB_STATUS.QUOTED]),
  ]);

  return {
    customers: customersResult.count ?? 0,
    vehicles: vehiclesResult.count ?? 0,
    jobs: jobsResult.count ?? 0,
    leads: leadsResult.count ?? 0,
    invoices: invoicesResult.count ?? 0,
  };
};

module.exports = {
  getDashboardStats,
};
