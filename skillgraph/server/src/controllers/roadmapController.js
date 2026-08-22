const roadmapService = require(
  "../services/roadmapService"
);

async function getRoadmap(req, res) {
  try {
    const { title } = req.params;

    const roadmap =
      await roadmapService.getRoadmapByCareer(
        title
      );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: roadmap,
    });

  } catch (error) {
    console.error(
      "Roadmap controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load roadmap",
    });
  }
}

module.exports = {
  getRoadmap,
};
