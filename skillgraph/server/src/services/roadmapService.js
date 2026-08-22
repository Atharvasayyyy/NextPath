const driver = require("../config/db");

async function getRoadmapByCareer(title) {
  const session = driver.session();

  try {
const result = await session.run(
  `
  MATCH (c:Career {title: $title})
        -[:HAS_STAGE]->
        (stage:Stage)

  OPTIONAL MATCH
    (stage)-[:CONTAINS]->
    (skill:Skill)

  OPTIONAL MATCH
    (skill)-[:USES]->
    (technology:Technology)

  OPTIONAL MATCH
    (skill)-[:HAS_RESOURCE]->
    (resource:Resource)

  RETURN
    c.title AS career,
    c.description AS description,

    stage.name AS stage,
    stage.order AS stageOrder,

    skill.name AS skill,
    skill.difficulty AS difficulty,
    skill.description AS skillDescription,

    technology.name AS technology,
    technology.category AS technologyCategory,

    collect(
      DISTINCT {
        title: resource.title,
        provider: resource.provider,
        type: resource.type,
        url: resource.url,
        free: resource.free
      }
    ) AS resources

  ORDER BY stageOrder, skill
  `,
  {
    title,
  }
);

    // ---------------------------------------------
    // NO ROADMAP
    // ---------------------------------------------

    if (result.records.length === 0) {
      return null;
    }

    // ---------------------------------------------
    // ROADMAP OBJECT
    // ---------------------------------------------

    const roadmap = {
      title: title,
      description:
        result.records[0].get("description") || "",
      stages: [],
    };

    // ---------------------------------------------
    // STAGE MAP
    // ---------------------------------------------

    const stageMap = new Map();

    // ---------------------------------------------
    // PROCESS RECORDS
    // ---------------------------------------------

    result.records.forEach((record) => {

      const stageName =
        record.get("stage");

      if (!stageName) {
        return;
      }

      // -------------------------------------------
      // HANDLE NEO4J INTEGER / JS NUMBER
      // -------------------------------------------

      const rawStageOrder =
        record.get("stageOrder");

      const stageOrder =
        typeof rawStageOrder?.toNumber ===
        "function"
          ? rawStageOrder.toNumber()
          : Number(rawStageOrder);

      // -------------------------------------------
      // CREATE STAGE
      // -------------------------------------------

      if (!stageMap.has(stageName)) {

        const stage = {
          name: stageName,
          order: stageOrder,
          skills: [],
        };

        stageMap.set(
          stageName,
          stage
        );

        roadmap.stages.push(stage);
      }

      const stage =
        stageMap.get(stageName);

      // -------------------------------------------
      // SKILL
      // -------------------------------------------

      const skillName =
        record.get("skill");

      if (!skillName) {
        return;
      }

      // -------------------------------------------
      // PREVENT DUPLICATE SKILLS
      // -------------------------------------------

      const skillExists =
        stage.skills.some(
          (skill) =>
            skill.name === skillName
        );

      if (skillExists) {
        return;
      }

      // -------------------------------------------
      // ADD SKILL
      // -------------------------------------------

const resources =
  record.get("resources") || [];

stage.skills.push({
  name: skillName,

  difficulty:
    record.get("difficulty") || null,

  description:
    record.get("skillDescription") || null,

  technology:
    record.get("technology") || null,

  technologyCategory:
    record.get("technologyCategory") || null,

  resources: resources
    .filter(
      (resource) =>
        resource.title !== null
    )
    .map((resource) => ({
      title: resource.title,
      provider: resource.provider,
      type: resource.type,
      url: resource.url,
      free: resource.free,
    })),
});


    });

    // ---------------------------------------------
    // SORT STAGES
    // ---------------------------------------------

    roadmap.stages.sort(
      (a, b) =>
        a.order - b.order
    );

    return roadmap;

  } finally {
    await session.close();
  }
}

module.exports = {
  getRoadmapByCareer,
};