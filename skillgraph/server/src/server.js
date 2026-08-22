require("dotenv").config();

const express = require("express");
const cors = require("cors");

const careerRoutes = require("./routes/careerRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================================
// CORS
// ============================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ============================================================
// BODY PARSER
// ============================================================

app.use(express.json());

// ============================================================
// ROOT
// ============================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillGraph API is running",
  });
});

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/health", async (req, res) => {
  try {
    const driver = require("./config/db");

    const session = driver.session();

    await session.run("RETURN 1 AS result");

    await session.close();

    res.status(200).json({
      success: true,
      database: "connected",
    });
  } catch (error) {
    console.error("Health check failed:", error);

    res.status(503).json({
      success: false,
      database: "unavailable",
    });
  }
});

// ============================================================
// CAREER ROUTES
// ============================================================

app.use("/api/careers", careerRoutes);

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});