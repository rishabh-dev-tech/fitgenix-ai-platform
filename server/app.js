require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Flex Aura API running...");
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/programs", require("./routes/programRoutes"));

app.use("/api/workouts", require("./routes/workoutRoutes"));

app.use("/api/progress", require("./routes/progressRoutes"));

app.use("/api/diet", require("./routes/dietRoutes"));

app.use("/api/ai", require("./routes/aiRoutes"));

app.use("/api/insights", require("./routes/insightRoutes"));

app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

/* GLOBAL ERROR HANDLER (must be last) */
app.use(errorHandler);

module.exports = app;