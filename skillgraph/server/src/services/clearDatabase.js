require("dotenv").config();

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

async function clearDatabase() {
  const session = driver.session();

  try {
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("✅ Database cleared successfully.");
  } catch (error) {
    console.error("❌ Failed to clear database:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

clearDatabase();

