const {
  searchYouTubePlaylists,
} = require("../services/youtubeService");

const {
  analyzeSkill,
} = require("../services/aiService");

async function exploreSkill(req, res) {
  try {
    const { skill } = req.params;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: "Skill is required",
      });
    }

    console.log(`AI exploring skill: ${skill}`);

    const playlists =
      await searchYouTubePlaylists(skill);

    const analysis =
      await analyzeSkill(skill);

    return res.status(200).json({
      success: true,
      data: {
        skill,

        analysis,

        resources: {
          youtube: playlists,
        },
      },
    });
  } catch (error) {
    console.error(
      "Skill exploration error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to explore skill",
    });
  }
}

module.exports = {
  exploreSkill,
};