require("dotenv").config();

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
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
      MATCH (c:Career)
            -[:REQUIRES]->
            (s:Skill)
            -[:USES]->
            (t:Technology)

      WHERE c.title = $title

      RETURN DISTINCT
        c.title AS career,
        s.name AS skill,
        t.name AS technology,
        t.type AS type

      ORDER BY technology
      `,
      {
        title: "Full Stack Developer"
      }
    );

    console.log("\n========== QUERY RESULT ==========\n");

    result.records.forEach((record) => {
      console.log({
        career: record.get("career"),
        skill: record.get("skill")
      });
    });

    console.log("\n==================================\n");
  } catch (error) {
    console.error("Query failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}


runQuery();