const graphService = require("../services/graphService");

async function getDeveloper(req, res) {
  try {
    const { name } = req.params;

    const developer = await graphService.findDeveloperByName(name);

    if (!developer) {
      return res.status(404).json({
        success: false,
        message: "Developer not found"
      });
    }

    res.json({
      success: true,
      data: developer
    });
  } catch (error) {
    console.error("Developer controller error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}

async function getDeveloperGraph(name) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (d:Developer)
            -[:KNOWS]->
            (s:Skill)
            -[:RELATED_TO]->
            (t:Technology)

      WHERE d.name = $name

      RETURN
        d.name AS developer,
        s.name AS skill,
        t.name AS technology
      `,
      {
        name
      }
    );

    return result.records.map((record) => ({
      developer: record.get("developer"),
      skill: record.get("skill"),
      technology: record.get("technology")
    }));
  } finally {
    await session.close();
  }
}


module.exports = {
  getDeveloper,
  getDeveloperGraph
};


