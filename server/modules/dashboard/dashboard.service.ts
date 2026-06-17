const dashboardRepository = require("./dashboard.repository");
const AppError = require("../../errors/AppError");

const getDashboardStats = async () => {
  return dashboardRepository.getDashboardStats();
};

module.exports = {
  getDashboardStats,
};
