const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
    process.exit(1); // crash if DB not connected
  });

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("🚀 API Running...");
});

// 🔹 Routes (IMPORT ONCE)
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const projectRoutes = require("./routes/projectRoutes"); // optional
// const testRoutes = require("./routes/test"); // optional

// 🔹 Use routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
// app.use("/api/test", testRoutes);

// 🔹 404 handler (optional but useful)
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// 🔹 Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});