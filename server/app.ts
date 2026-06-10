require("dotenv").config();
const supabase = require("./config/db/supabase");

const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const customerRoutes = require("./modules/customer/customerRoutes");
const vehicleRoutes = require("./modules/vehicle/vehicleRoutes");
const jobRoutes = require("./modules/job/jobRoutes");

app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/jobs", jobRoutes);

app.get("/test-db", async (req: any, res: any) => {
  const { data, error } = await supabase.from("audit_logs").select("*");

  console.log(data);
  console.log(error);

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.get("/test-vehicles", async (req: any, res: any) => {
  const { data, error } = await supabase.from("vehicles").select("*");

  console.log(data);
  console.log(error);

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.get("/test-jobs", async (req: any, res: any) => {
  const { data, error } = await supabase.from("jobs").select("*");

  console.log(data);
  console.log(error);

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
});

app.get("/", (req: any, res: any) => {
  res.send("Server API is running");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
