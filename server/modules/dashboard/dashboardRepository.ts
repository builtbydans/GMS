import { DashboardStatsDto } from "../../types/dashoard.types";

const supabase = require("../../config/db/supabase");
const { DashboardStatsDto } = require("../../types/dashoard.types");

const getDashboardStats = async (): Promise<DashboardStatsDto> => {
  const [customersResult, vehiclesResult, jobsResult, invoicesResult] =
    await Promise.all([
      supabase.from("customers").select("*", { count: "exact" }),
      supabase.from("vehicles").select("*", { count: "exact" }),
      supabase.from("jobs").select("*", { count: "exact" }),
      supabase.from("invoices").select("*", { count: "exact" }),
    ]);

  return {
    customers: customersResult.count ?? 0,
    vehicles: vehiclesResult.count ?? 0,
    jobs: jobsResult.count ?? 0,
    invoices: invoicesResult.count ?? 0,
  };
};

module.exports = {
  getDashboardStats,
};
