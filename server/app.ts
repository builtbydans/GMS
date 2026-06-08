require("dotenv").config();
const supabase = require("./config/db/supabase");

const express = require("express");
const app = express();
// const taskRoutes = require("./routes/tasks");
// const authRoutes = require("./routes/auth");
// const calendarRoutes = require("./routes/calendar");
const customerRoutes = require("./routes/customerRoutes");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
// app.use("/tasks", taskRoutes);
// app.use("/auth", authRoutes);
// app.use("/calendar", calendarRoutes);
app.use("/customers", customerRoutes);

app.get("/test-db", async (req: any, res: any) => {
  const { data, error } = await supabase.from("audit_logs").select("*");

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
