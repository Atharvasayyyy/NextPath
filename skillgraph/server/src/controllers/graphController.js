const { findCareerGraph } = require("../services/graphService");

async function getCareerGraph(req, res, next) {
  try {
    const graph = await findCareerGraph(req.params.career);
    res.json(graph);
  } catch (error) {
    next(error);
  }
}

module.exports = { getCareerGraph };
