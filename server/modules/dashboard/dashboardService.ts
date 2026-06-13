const dashboardRepository = require("./dashboardRepository");
const AppError = require("../../errors/AppError");

const getDashboardStats = async () => {
  return dashboardRepository.getDashboardStats();
};

module.exports = {
  getDashboardStats,
};
