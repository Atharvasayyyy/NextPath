const listSkills = `
  MATCH (skill:Skill)
  RETURN skill
  ORDER BY skill.name
`;

module.exports = { listSkills };
