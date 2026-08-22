const driver = require("../config/db");
const { listSkills } = require("../queries/skillQueries");

async function getSkills(req, res, next) {
  const session = driver.session();

  try {
    const result = await session.run(listSkills);
    const skills = result.records.map((record) => record.get("skill").properties);
    res.json(skills);
  } catch (error) {
    next(error);
  } finally {
    await session.close();
  }
}

module.exports = { getSkills };
