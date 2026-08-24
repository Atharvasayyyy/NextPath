require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const careerRoutes = require("./routes/careerRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const skillRoutes = require("./routes/skillRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================================
// PUBLIC / FRONTEND DIRECTORY
// ============================================================

const publicDir = path.join(__dirname, "../public");

// ============================================================
// CORS
// ============================================================

const allowedOrigins = (
  process.env.FRONTEND_URL ||
  "http://localhost:5051,http://localhost:5173,https://atharvasayyyy.github.io"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      console.error("Blocked CORS origin:", origin);

      callback(new Error("Origin is not allowed by CORS"));
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

// ============================================================
// BODY PARSER
// ============================================================

app.use(express.json());

// ============================================================
// STATIC FRONTEND
// ============================================================

// Normal frontend files
// /assets/... -> /app/public/assets/...
app.use(express.static(publicDir));

// Your React build currently uses /NextPath/ as its base path.
// Therefore:
// /NextPath/assets/... -> /app/public/assets/...
app.use(
  "/NextPath",
  express.static(publicDir)
);

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
// API ROUTES
// ============================================================

app.use("/api/careers", careerRoutes);

app.use("/api/roadmaps", roadmapRoutes);

app.use("/api/skills", skillRoutes);

// ============================================================
// FRONTEND ROOT
// ============================================================

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// ============================================================
// REACT ROUTING
// ============================================================

// React Router routes
app.get("*name", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// ============================================================
// 404
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ============================================================
// ERROR HANDLER
// ============================================================

app.use((error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  console.log(
    "Skill exploration API:",
    `http://localhost:${PORT}/api/skills/:skill/explore`
  );
});