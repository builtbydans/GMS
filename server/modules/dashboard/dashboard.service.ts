const dashboardRepository = require("./dashboard.repository");
const jobRaiseService = require("../job/raises/job-raise.service");

const getDashboardStats = async () => {
  const [stats, openRaises] = await Promise.all([
    dashboardRepository.getDashboardStats(),
    jobRaiseService.getOpenRaisesForDashboard(),
  ]);

  return {
    ...stats,
    openRaises,
    openRaiseCount: openRaises.length,
  };
};

module.exports = {
  getDashboardStats,
};
