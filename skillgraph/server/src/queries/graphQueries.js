const getCareerGraph = `
  MATCH path = (career:Career {name: $career})-[*1..3]-(connected)
  RETURN path
`;

module.exports = { getCareerGraph };
