import { DashboardStatsDto } from "../../types/dashoard.types";

const supabase = require("../../config/db/supabase");
const { DashboardStatsDto } = require("../../types/dashoard.types");

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
      .in("status", ["LEAD", "QUOTED"]),
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
