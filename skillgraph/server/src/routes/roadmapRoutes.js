const express = require("express");

const router = express.Router();

const {
  getRoadmap,
} = require(
  "../controllers/roadmapController"
);

router.get(
  "/:title",
  getRoadmap
);

module.exports = router;

