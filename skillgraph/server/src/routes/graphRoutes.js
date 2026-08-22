const express = require("express");
const { getCareerGraph } = require("../controllers/graphController");

const router = express.Router();

router.get("/:career", getCareerGraph);

module.exports = router;
