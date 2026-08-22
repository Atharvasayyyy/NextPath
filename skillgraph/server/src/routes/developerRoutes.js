const express = require("express");

const {
  getDeveloper
} = require("../controllers/developerController");

const router = express.Router();

router.get("/:name", getDeveloper);

module.exports = router;