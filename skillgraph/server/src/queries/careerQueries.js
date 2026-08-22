const listCareers = `
  MATCH (career:Career)
  RETURN career
  ORDER BY career.name
`;

module.exports = { listCareers };
