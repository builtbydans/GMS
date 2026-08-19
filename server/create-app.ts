const express = require("express");
const cors = require("cors");

const healthRoutes = require("./modules/health/health.routes");
const customerRoutes = require("./modules/customer/customer.routes");
const vehicleRoutes = require("./modules/vehicle/vehicle.routes");
const jobRoutes = require("./modules/job/job.routes");
const invoiceRoutes = require("./modules/invoice/invoice.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const leadRoutes = require("./modules/lead/lead.routes");
const employeeRoutes = require("./modules/employee/employee.routes");
const workshopRoutes = require("./modules/workshop/workshop.routes");
const { notFoundMiddleware } = require("./middleware/not-found.middleware");
const { errorMiddleware } = require("./middleware/error.middleware");
const {
  authenticateMiddleware,
} = require("./middleware/authenticate.middleware");

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/health", healthRoutes);
  app.use("/workshop", workshopRoutes);
  app.use("/customers", authenticateMiddleware, customerRoutes);
  app.use("/vehicles", authenticateMiddleware, vehicleRoutes);
  app.use("/jobs", authenticateMiddleware, jobRoutes);
  app.use("/invoices", authenticateMiddleware, invoiceRoutes);
  app.use("/dashboard", authenticateMiddleware, dashboardRoutes);
  app.use("/leads", authenticateMiddleware, leadRoutes);
  app.use("/employees", authenticateMiddleware, employeeRoutes);

  app.get("/", (_req: any, res: any) => {
    res.send("Server API is running");
  });

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};

module.exports = { createApp };
