require("dotenv").config();

const express = require("express");
const cors = require("cors");

const jobRoutes =
  require("./routes/jobRoutes");

const careerRoutes =
  require("./routes/careerRoutes");

const roadmapRoutes =
  require("./routes/roadmapRoutes");

const skillRoutes =
  require("./routes/skillRoutes");

const app = express();

const PORT =
  process.env.PORT || 5000;


// ============================================================
// CORS
// ============================================================

app.use(
  cors({
    origin: "http://localhost:5173",

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
// HEALTH
// ============================================================

app.get("/health", async (req, res) => {
  try {
    const driver =
      require("./config/db");

    const session =
      driver.session();

    await session.run(
      "RETURN 1 AS result"
    );

    await session.close();

    res.status(200).json({
      success: true,
      database: "connected",
    });

  } catch (error) {

    console.error(
      "Health check failed:",
      error
    );

    res.status(503).json({
      success: false,
      database: "unavailable",
    });
  }
});


// ============================================================
// CAREER ROUTES
// ============================================================

app.use(
  "/api/careers",
  careerRoutes
);

app.use(
  "/api/jobs",
  jobRoutes
);


// ============================================================
// ROADMAP ROUTES
// ============================================================

app.use(
  "/api/roadmaps",
  roadmapRoutes
);


// ============================================================
// SKILL / AI EXPLORATION ROUTES
// ============================================================

app.use(
  "/api/skills",
  skillRoutes
);


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

app.use(
  (error, req, res, next) => {

    console.error(
      "SERVER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`
    );

    console.log(
      "Skill exploration API:",
      `http://localhost:${PORT}/api/skills/:skill/explore`
    );
  }
);