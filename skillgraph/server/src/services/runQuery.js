require("dotenv").config();

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.CONGNODB_URL,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

async function runQuery() {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Career {title: $title})
            -[:HAS_STAGE]->
            (stage:Stage)
            -[:CONTAINS]->
            (s:Skill)
            -[:USES]->
            (t:Technology)

      RETURN DISTINCT
        c.title AS career,
        stage.name AS stage,
        stage.order AS stageOrder,
        s.name AS skill,
        s.difficulty AS difficulty,
        t.name AS technology,
        t.category AS category

      ORDER BY stageOrder, skill
      `,
      {
        title: "Full Stack Developer",
      }
    );

    console.log(
      "\n========== ROADMAP QUERY RESULT ==========\n"
    );

    result.records.forEach((record) => {
      console.log({
        career: record.get("career"),
        stage: record.get("stage"),
        skill: record.get("skill"),
        difficulty: record.get("difficulty"),
        technology: record.get("technology"),
        category: record.get("category"),
      });
    });

    console.log(
      "\n==========================================\n"
    );

  } catch (error) {
    console.error(
      "Query failed:",
      error
    );
  } finally {
    await session.close();
    await driver.close();
  }
}

runQuery();