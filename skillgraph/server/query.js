require("dotenv").config();

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

async function getGraph() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (d:Developer)-[:KNOWS]->(s:Skill)
      RETURN d, s
    `);

    for (const record of result.records) {
      console.log(record.toObject());
    }
  } catch (error) {
    console.error(error);
  } finally {
    await session.close();
    await driver.close();
  }
}

getGraph();

