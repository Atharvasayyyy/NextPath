const express = require("express");

const {
  getAllCareers,
  getCareerByTitle,
  getCareerSkills,
  getCareerTechnologies,
  getCareerProjects,
  getCareerGraph,
  getCompaniesBySkill
} = require("../controllers/careerController");

const router = express.Router();

router.get("/", getAllCareers);

router.get("/:title/skills", getCareerSkills);

router.get("/:title/technologies", getCareerTechnologies);

router.get("/:title/projects", getCareerProjects);

router.get("/:title/graph", getCareerGraph);

router.get("/:title", getCareerByTitle);

router.get(
  "/skill/:skillName/companies",
  getCompaniesBySkill
);



module.exports = router;