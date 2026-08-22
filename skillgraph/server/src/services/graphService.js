const driver = require("../config/db");

async function getAllCareers() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (c:Career)

      RETURN
        c.title AS title

      ORDER BY c.title
    `);

    return result.records.map((record) => ({
      title: record.get("title")
    }));
  } finally {
    await session.close();
  }
}

async function getCareerByTitle(title) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Career)

      WHERE c.title = $title

      RETURN
        c.title AS title
      `,
      {
        title
      }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      title: record.get("title")
    };
  } finally {
    await session.close();
  }
}

async function getCareerSkills(title) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Career)-[:REQUIRES]->(s:Skill)

      WHERE c.title = $title

      RETURN
        s.name AS name

      ORDER BY s.name
      `,
      {
        title
      }
    );

    return result.records.map((record) => ({
      name: record.get("name")
    }));
  } finally {
    await session.close();
  }
}

async function getCareerTechnologies(title) {
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
        t.name AS name,
        t.type AS type

      ORDER BY t.name
      `,
      {
        title
      }
    );

    return result.records.map((record) => ({
      name: record.get("name"),
      type: record.get("type")
    }));
  } finally {
    await session.close();
  }
}

async function getCareerProjects(title) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Career)-[:RECOMMENDS]->(p:Project)

      WHERE c.title = $title

      RETURN
        p.name AS name,
        p.difficulty AS difficulty

      ORDER BY p.name
      `,
      {
        title
      }
    );

    return result.records.map((record) => ({
      name: record.get("name"),
      difficulty: record.get("difficulty")
    }));
  } finally {
    await session.close();
  }
}

async function getCompaniesBySkill(skillName) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (s:Skill)
            <-[:REQUIRES]-
            (career:Career)
            <-[:HIRES_FOR]-
            (company:Company)

      WHERE s.name = $skillName

      RETURN DISTINCT
        company.name AS company,
        company.location AS location,
        career.title AS career

      ORDER BY company.name
      `,
      {
        skillName
      }
    );

    return result.records.map((record) => ({
      company: record.get("company"),
      location: record.get("location"),
      career: record.get("career")
    }));
  } finally {
    await session.close();
  }
}


async function getCareerGraph(title) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Career {title: $title})

      OPTIONAL MATCH (c)-[:REQUIRES]->(s:Skill)

      OPTIONAL MATCH (s)-[:USES]->(t:Technology)

      OPTIONAL MATCH (c)-[:RECOMMENDS]->(p:Project)

      RETURN
        c,
        collect(DISTINCT s) AS skills,
        collect(DISTINCT t) AS technologies,
        collect(DISTINCT p) AS projects
      `,
      {
        title,
      }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    const career = record.get("c");
    const skills = record.get("skills");
    const technologies = record.get("technologies");
    const projects = record.get("projects");

    const nodes = [];
    const edges = [];

    // ============================================================
    // CAREER NODE
    // ============================================================

    const careerId =
      `career-${career.properties.title}`;

    nodes.push({
      id: careerId,
      type: "career",
      label: career.properties.title,
    });

    // ============================================================
    // SKILLS
    // ============================================================

    skills.forEach((skill) => {
      if (!skill) {
        return;
      }

      const skillName =
        skill.properties.name;

      const skillId =
        `skill-${skillName}`;

      nodes.push({
        id: skillId,
        type: "skill",
        label: skillName,
      });

      edges.push({
        id: `${careerId}-${skillId}`,
        source: careerId,
        target: skillId,
        label: "REQUIRES",
      });
    });

    // ============================================================
    // TECHNOLOGIES
    // ============================================================

    technologies.forEach((technology) => {
      if (!technology) {
        return;
      }

      const technologyName =
        technology.properties.name;

      const technologyId =
        `technology-${technologyName}`;

      nodes.push({
        id: technologyId,
        type: "technology",
        label: technologyName,
      });
    });

    // ============================================================
    // PROJECTS
    // ============================================================

    projects.forEach((project) => {
      if (!project) {
        return;
      }

      const projectName =
        project.properties.name;

      const projectId =
        `project-${projectName}`;

      nodes.push({
        id: projectId,
        type: "project",
        label: projectName,
      });

      edges.push({
        id: `${careerId}-${projectId}`,
        source: careerId,
        target: projectId,
        label: "RECOMMENDS",
      });
    });

    // ============================================================
    // SKILL -> TECHNOLOGY
    // ============================================================

    for (const skill of skills) {
      if (!skill) {
        continue;
      }

      const skillName =
        skill.properties.name;

      const skillId =
        `skill-${skillName}`;

      const technologyResult =
        await session.run(
          `
          MATCH (s:Skill {name: $skillName})
                -[:USES]->
                (t:Technology)

          RETURN t
          `,
          {
            skillName,
          }
        );

      technologyResult.records.forEach(
        (technologyRecord) => {
          const technology =
            technologyRecord.get("t");

          const technologyName =
            technology.properties.name;

          const technologyId =
            `technology-${technologyName}`;

          edges.push({
            id: `${skillId}-${technologyId}`,
            source: skillId,
            target: technologyId,
            label: "USES",
          });
        }
      );
    }

    // ============================================================
    // REMOVE DUPLICATES
    // ============================================================

    const uniqueNodes = Array.from(
      new Map(
        nodes.map((node) => [
          node.id,
          node,
        ])
      ).values()
    );

    const uniqueEdges = Array.from(
      new Map(
        edges.map((edge) => [
          edge.id,
          edge,
        ])
      ).values()
    );

    // ============================================================
    // FINAL GRAPH
    // ============================================================

    return {
      nodes: uniqueNodes,
      edges: uniqueEdges,
    };
  } finally {
    await session.close();
  }
}




module.exports = {
  getAllCareers,
  getCareerByTitle,
  getCareerSkills,
  getCareerTechnologies,
  getCareerProjects,
  getCareerGraph,
  getCompaniesBySkill
};