const express = require("express");

const {
  exploreSkill,
} = require("../controllers/skillController");

const router = express.Router();

router.get("/:skill/explore", exploreSkill);

module.exports = router;