require("dotenv").config();

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

async function testGraph() {
  const session = driver.session();

  try {
    console.log("\n========================================");
    console.log("       SKILLGRAPH DATABASE TEST");
    console.log("========================================\n");

    // ============================================================
    // TEST 1: GET ALL CAREERS
    // ============================================================

    console.log("1️⃣ ALL CAREERS");
    console.log("----------------------------------------");

    const careersResult = await session.run(`
      MATCH (c:Career)
      RETURN c.title AS title
      ORDER BY c.title
    `);

    careersResult.records.forEach((record) => {
      console.log("-", record.get("title"));
    });

    // ============================================================
    // TEST 2: GET ALL SKILLS
    // ============================================================

    console.log("\n2️⃣ ALL SKILLS");
    console.log("----------------------------------------");

    const skillsResult = await session.run(`
      MATCH (s:Skill)
      RETURN s.name AS name
      ORDER BY s.name
    `);

    skillsResult.records.forEach((record) => {
      console.log("-", record.get("name"));
    });

    // ============================================================
    // TEST 3: CAREER -> SKILLS
    // ============================================================

    console.log("\n3️⃣ FULL STACK DEVELOPER SKILLS");
    console.log("----------------------------------------");

    const careerSkillsResult = await session.run(
      `
      MATCH (c:Career)-[:REQUIRES]->(s:Skill)
      WHERE c.title = $career
      RETURN s.name AS skill
      ORDER BY s.name
      `,
      {
        career: "Full Stack Developer"
      }
    );

    careerSkillsResult.records.forEach((record) => {
      console.log("-", record.get("skill"));
    });

    // ============================================================
    // TEST 4: CAREER -> SKILL -> TECHNOLOGY
    // MULTI-HOP QUERY
    // ============================================================

    console.log("\n4️⃣ FULL STACK DEVELOPER TECHNOLOGIES");
    console.log("----------------------------------------");

    const technologyResult = await session.run(
      `
      MATCH (c:Career)
            -[:REQUIRES]->
            (s:Skill)
            -[:USES]->
            (t:Technology)

      WHERE c.title = $career

      RETURN DISTINCT
        s.name AS skill,
        t.name AS technology

      ORDER BY technology
      `,
      {
        career: "Full Stack Developer"
      }
    );

    technologyResult.records.forEach((record) => {
      console.log(
        `${record.get("skill")} -> ${record.get("technology")}`
      );
    });

    // ============================================================
    // TEST 5: CAREER -> PROJECT
    // ============================================================

    console.log("\n5️⃣ RECOMMENDED PROJECTS");
    console.log("----------------------------------------");

    const projectsResult = await session.run(
      `
      MATCH (c:Career)-[:RECOMMENDS]->(p:Project)
      WHERE c.title = $career

      RETURN
        p.name AS project,
        p.difficulty AS difficulty

      ORDER BY p.name
      `,
      {
        career: "Full Stack Developer"
      }
    );

    projectsResult.records.forEach((record) => {
      console.log(
        `- ${record.get("project")} [${record.get("difficulty")}]`
      );
    });

    // ============================================================
    // TEST 6: COMPANY -> CAREER
    // ============================================================

    console.log("\n6️⃣ COMPANIES FOR FULL STACK DEVELOPER");
    console.log("----------------------------------------");

    const companiesResult = await session.run(
      `
      MATCH (company:Company)
            -[:HIRES_FOR]->
            (career:Career)

      WHERE career.title = $career

      RETURN
        company.name AS company,
        company.location AS location

      ORDER BY company.name
      `,
      {
        career: "Full Stack Developer"
      }
    );

    companiesResult.records.forEach((record) => {
      console.log(
        `- ${record.get("company")} (${record.get("location")})`
      );
    });

    // ============================================================
    // TEST 7: SKILL -> CAREER -> COMPANY
    // MULTI-HOP GRAPH QUERY
    // ============================================================

    console.log("\n7️⃣ COMPANIES CONNECTED TO JAVASCRIPT");
    console.log("----------------------------------------");

    const skillCompaniesResult = await session.run(
      `
      MATCH (s:Skill)
            <-[:REQUIRES]-
            (career:Career)
            <-[:HIRES_FOR]-
            (company:Company)

      WHERE s.name = $skill

      RETURN DISTINCT
        s.name AS skill,
        career.title AS career,
        company.name AS company

      ORDER BY company
      `,
      {
        skill: "JavaScript"
      }
    );

    skillCompaniesResult.records.forEach((record) => {
      console.log(
        `${record.get("skill")} -> ${record.get("career")} -> ${record.get("company")}`
      );
    });

    // ============================================================
    // TEST 8: THREE-HOP QUERY
    //
    // CAREER -> SKILL -> TECHNOLOGY
    // ============================================================

    console.log("\n8️⃣ THREE-NODE CAREER PATH");
    console.log("----------------------------------------");

    const threeHopResult = await session.run(
      `
      MATCH path =
        (c:Career)
        -[:REQUIRES]->
        (s:Skill)
        -[:USES]->
        (t:Technology)

      WHERE c.title = $career

      RETURN
        c.title AS career,
        s.name AS skill,
        t.name AS technology

      ORDER BY skill
      `,
      {
        career: "Full Stack Developer"
      }
    );

    threeHopResult.records.forEach((record) => {
      console.log(
        `${record.get("career")} -> ${record.get("skill")} -> ${record.get("technology")}`
      );
    });

    // ============================================================
    // TEST 9: COUNT NODES
    // ============================================================

    console.log("\n9️⃣ NODE COUNTS");
    console.log("----------------------------------------");

    const countResult = await session.run(`
      MATCH (c:Career)
      WITH count(c) AS careers

      MATCH (s:Skill)
      WITH careers, count(s) AS skills

      MATCH (t:Technology)
      WITH careers, skills, count(t) AS technologies

      MATCH (p:Project)
      WITH careers, skills, technologies, count(p) AS projects

      MATCH (company:Company)

      RETURN
        careers,
        skills,
        technologies,
        projects,
        count(company) AS companies
    `);

    const counts = countResult.records[0];

    console.log("Careers:", counts.get("careers").toNumber());
    console.log("Skills:", counts.get("skills").toNumber());
    console.log(
      "Technologies:",
      counts.get("technologies").toNumber()
    );
    console.log("Projects:", counts.get("projects").toNumber());
    console.log("Companies:", counts.get("companies").toNumber());

    // ============================================================
    // TEST 10: COUNT RELATIONSHIPS
    // ============================================================

    console.log("\n🔟 RELATIONSHIP COUNT");
    console.log("----------------------------------------");

    const relationshipResult = await session.run(`
      MATCH ()-[r]->()
      RETURN count(r) AS totalRelationships
    `);

    const totalRelationships =
      relationshipResult.records[0]
        .get("totalRelationships")
        .toNumber();

    console.log(
      "Total relationships:",
      totalRelationships
    );

    // ============================================================
    // TEST 11: COMPLETE GRAPH PATH
    // ============================================================

    console.log("\n1️⃣1️⃣ COMPLETE GRAPH PATH");
    console.log("----------------------------------------");

    const pathResult = await session.run(
      `
      MATCH
        (company:Company)
        -[:HIRES_FOR]->
        (career:Career)
        -[:REQUIRES]->
        (skill:Skill)
        -[:USES]->
        (technology:Technology)

      WHERE company.name = $company

      RETURN
        company.name AS company,
        career.title AS career,
        skill.name AS skill,
        technology.name AS technology

      ORDER BY career, skill
      `,
      {
        company: "TechNova"
      }
    );

    pathResult.records.forEach((record) => {
      console.log(
        `${record.get("company")} -> ` +
        `${record.get("career")} -> ` +
        `${record.get("skill")} -> ` +
        `${record.get("technology")}`
      );
    });

    console.log("\n========================================");
    console.log("       ALL TESTS COMPLETED ✅");
    console.log("========================================\n");
  } catch (error) {
    console.error("\n❌ Graph test failed:");
    console.error(error);
  } finally {
    await session.close();
    await driver.close();
  }
}

testGraph();