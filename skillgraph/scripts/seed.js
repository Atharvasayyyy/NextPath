require("dotenv").config();

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("🌱 Starting database seed...\n");

    // ============================================================
    // 1. CREATE CAREERS
    // ============================================================

    console.log("Creating careers...");

    await session.run(`
      MERGE (:Career {
        title: 'Full Stack Developer'
      })

      MERGE (:Career {
        title: 'Frontend Developer'
      })

      MERGE (:Career {
        title: 'Backend Developer'
      })

      MERGE (:Career {
        title: 'DevOps Engineer'
      })

      MERGE (:Career {
        title: 'Data Engineer'
      })
    `);

    // ============================================================
    // 2. CREATE SKILLS
    // ============================================================

    console.log("Creating skills...");

    await session.run(`
      MERGE (:Skill {
        name: 'JavaScript'
      })

      MERGE (:Skill {
        name: 'React'
      })

      MERGE (:Skill {
        name: 'Node.js'
      })

      MERGE (:Skill {
        name: 'Express.js'
      })

      MERGE (:Skill {
        name: 'Git'
      })

      MERGE (:Skill {
        name: 'REST APIs'
      })

      MERGE (:Skill {
        name: 'Docker'
      })

      MERGE (:Skill {
        name: 'SQL'
      })

      MERGE (:Skill {
        name: 'Python'
      })

      MERGE (:Skill {
        name: 'AWS'
      })
    `);

    // ============================================================
    // 3. CREATE TECHNOLOGIES
    // ============================================================

    console.log("Creating technologies...");

    await session.run(`
      MERGE (:Technology {
        name: 'React',
        type: 'Frontend Framework'
      })

      MERGE (:Technology {
        name: 'Node.js',
        type: 'Runtime'
      })

      MERGE (:Technology {
        name: 'MongoDB',
        type: 'Database'
      })

      MERGE (:Technology {
        name: 'PostgreSQL',
        type: 'Database'
      })

      MERGE (:Technology {
        name: 'Docker',
        type: 'Containerization'
      })

      MERGE (:Technology {
        name: 'AWS',
        type: 'Cloud'
      })
    `);

    // ============================================================
    // 4. CREATE PROJECTS
    // ============================================================

    console.log("Creating projects...");

    await session.run(`
      MERGE (:Project {
        name: 'E-Commerce Platform',
        difficulty: 'Advanced'
      })

      MERGE (:Project {
        name: 'Real-Time Chat Application',
        difficulty: 'Intermediate'
      })

      MERGE (:Project {
        name: 'Job Portal',
        difficulty: 'Advanced'
      })

      MERGE (:Project {
        name: 'URL Shortener',
        difficulty: 'Beginner'
      })

      MERGE (:Project {
        name: 'Expense Tracker',
        difficulty: 'Beginner'
      })
    `);

    // ============================================================
    // 5. CREATE COMPANIES
    // ============================================================

    console.log("Creating companies...");

    await session.run(`
      MERGE (:Company {
        name: 'TechNova',
        location: 'Pune',
        industry: 'Software'
      })

      MERGE (:Company {
        name: 'CloudWorks',
        location: 'Mumbai',
        industry: 'Cloud Technology'
      })

      MERGE (:Company {
        name: 'DataSphere',
        location: 'Bangalore',
        industry: 'Data Technology'
      })

      MERGE (:Company {
        name: 'FinStack',
        location: 'Mumbai',
        industry: 'FinTech'
      })

      MERGE (:Company {
        name: 'AppForge',
        location: 'Pune',
        industry: 'Software'
      })
    `);

    // ============================================================
    // 6. CAREER -> SKILL
    // ============================================================

    console.log("Creating Career -> Skill relationships...");

    await session.run(`
      MATCH (c:Career {title: 'Full Stack Developer'})
      MATCH (s:Skill {name: 'JavaScript'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Full Stack Developer'})
      MATCH (s:Skill {name: 'React'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Full Stack Developer'})
      MATCH (s:Skill {name: 'Node.js'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Full Stack Developer'})
      MATCH (s:Skill {name: 'Express.js'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Full Stack Developer'})
      MATCH (s:Skill {name: 'Git'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Frontend Developer'})
      MATCH (s:Skill {name: 'JavaScript'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Frontend Developer'})
      MATCH (s:Skill {name: 'React'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Frontend Developer'})
      MATCH (s:Skill {name: 'Git'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Backend Developer'})
      MATCH (s:Skill {name: 'Node.js'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Backend Developer'})
      MATCH (s:Skill {name: 'Express.js'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Backend Developer'})
      MATCH (s:Skill {name: 'REST APIs'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Backend Developer'})
      MATCH (s:Skill {name: 'SQL'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'DevOps Engineer'})
      MATCH (s:Skill {name: 'Docker'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'DevOps Engineer'})
      MATCH (s:Skill {name: 'AWS'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'DevOps Engineer'})
      MATCH (s:Skill {name: 'Git'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Data Engineer'})
      MATCH (s:Skill {name: 'Python'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Data Engineer'})
      MATCH (s:Skill {name: 'SQL'})
      MERGE (c)-[:REQUIRES]->(s)

      MATCH (c:Career {title: 'Data Engineer'})
      MATCH (s:Skill {name: 'AWS'})
      MERGE (c)-[:REQUIRES]->(s)
    `);

    // ============================================================
    // 7. SKILL -> SKILL
    // ============================================================

    console.log("Creating Skill -> Skill relationships...");

    await session.run(`
      MATCH (a:Skill {name: 'JavaScript'})
      MATCH (b:Skill {name: 'React'})
      MERGE (a)-[:RELATED_TO]->(b)

      MATCH (a:Skill {name: 'JavaScript'})
      MATCH (b:Skill {name: 'Node.js'})
      MERGE (a)-[:RELATED_TO]->(b)

      MATCH (a:Skill {name: 'Node.js'})
      MATCH (b:Skill {name: 'Express.js'})
      MERGE (a)-[:RELATED_TO]->(b)

      MATCH (a:Skill {name: 'React'})
      MATCH (b:Skill {name: 'JavaScript'})
      MERGE (a)-[:RELATED_TO]->(b)

      MATCH (a:Skill {name: 'Node.js'})
      MATCH (b:Skill {name: 'REST APIs'})
      MERGE (a)-[:RELATED_TO]->(b)

      MATCH (a:Skill {name: 'Docker'})
      MATCH (b:Skill {name: 'AWS'})
      MERGE (a)-[:RELATED_TO]->(b)

      MATCH (a:Skill {name: 'Python'})
      MATCH (b:Skill {name: 'SQL'})
      MERGE (a)-[:RELATED_TO]->(b)

      MATCH (a:Skill {name: 'SQL'})
      MATCH (b:Skill {name: 'AWS'})
      MERGE (a)-[:RELATED_TO]->(b)
    `);

    // ============================================================
    // 8. SKILL -> TECHNOLOGY
    // ============================================================

    console.log("Creating Skill -> Technology relationships...");

    await session.run(`
      MATCH (s:Skill {name: 'React'})
      MATCH (t:Technology {name: 'React'})
      MERGE (s)-[:USES]->(t)

      MATCH (s:Skill {name: 'Node.js'})
      MATCH (t:Technology {name: 'Node.js'})
      MERGE (s)-[:USES]->(t)

      MATCH (s:Skill {name: 'Docker'})
      MATCH (t:Technology {name: 'Docker'})
      MERGE (s)-[:USES]->(t)

      MATCH (s:Skill {name: 'AWS'})
      MATCH (t:Technology {name: 'AWS'})
      MERGE (s)-[:USES]->(t)

      MATCH (s:Skill {name: 'SQL'})
      MATCH (t:Technology {name: 'PostgreSQL'})
      MERGE (s)-[:USES]->(t)
    `);

    // ============================================================
    // 9. PROJECT -> SKILL
    // ============================================================

    console.log("Creating Project -> Skill relationships...");

    await session.run(`
      MATCH (p:Project {name: 'E-Commerce Platform'})
      MATCH (s:Skill {name: 'JavaScript'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'E-Commerce Platform'})
      MATCH (s:Skill {name: 'React'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'E-Commerce Platform'})
      MATCH (s:Skill {name: 'Node.js'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'E-Commerce Platform'})
      MATCH (s:Skill {name: 'REST APIs'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'Real-Time Chat Application'})
      MATCH (s:Skill {name: 'JavaScript'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'Real-Time Chat Application'})
      MATCH (s:Skill {name: 'React'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'Real-Time Chat Application'})
      MATCH (s:Skill {name: 'Node.js'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'Job Portal'})
      MATCH (s:Skill {name: 'JavaScript'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'Job Portal'})
      MATCH (s:Skill {name: 'React'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'Job Portal'})
      MATCH (s:Skill {name: 'Node.js'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'URL Shortener'})
      MATCH (s:Skill {name: 'Node.js'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'URL Shortener'})
      MATCH (s:Skill {name: 'REST APIs'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'Expense Tracker'})
      MATCH (s:Skill {name: 'JavaScript'})
      MERGE (p)-[:REQUIRES]->(s)

      MATCH (p:Project {name: 'Expense Tracker'})
      MATCH (s:Skill {name: 'SQL'})
      MERGE (p)-[:REQUIRES]->(s)
    `);

    // ============================================================
    // 10. CAREER -> PROJECT
    // ============================================================

    console.log("Creating Career -> Project relationships...");

    await session.run(`
      MATCH (c:Career {title: 'Full Stack Developer'})
      MATCH (p:Project {name: 'E-Commerce Platform'})
      MERGE (c)-[:RECOMMENDS]->(p)

      MATCH (c:Career {title: 'Full Stack Developer'})
      MATCH (p:Project {name: 'Real-Time Chat Application'})
      MERGE (c)-[:RECOMMENDS]->(p)

      MATCH (c:Career {title: 'Full Stack Developer'})
      MATCH (p:Project {name: 'Job Portal'})
      MERGE (c)-[:RECOMMENDS]->(p)

      MATCH (c:Career {title: 'Frontend Developer'})
      MATCH (p:Project {name: 'Real-Time Chat Application'})
      MERGE (c)-[:RECOMMENDS]->(p)

      MATCH (c:Career {title: 'Backend Developer'})
      MATCH (p:Project {name: 'URL Shortener'})
      MERGE (c)-[:RECOMMENDS]->(p)

      MATCH (c:Career {title: 'Backend Developer'})
      MATCH (p:Project {name: 'Job Portal'})
      MERGE (c)-[:RECOMMENDS]->(p)

      MATCH (c:Career {title: 'Data Engineer'})
      MATCH (p:Project {name: 'Expense Tracker'})
      MERGE (c)-[:RECOMMENDS]->(p)
    `);

    // ============================================================
    // 11. COMPANY -> CAREER
    // ============================================================

    console.log("Creating Company -> Career relationships...");

    await session.run(`
      MATCH (company:Company {name: 'TechNova'})
      MATCH (career:Career {title: 'Full Stack Developer'})
      MERGE (company)-[:HIRES_FOR]->(career)

      MATCH (company:Company {name: 'TechNova'})
      MATCH (career:Career {title: 'Backend Developer'})
      MERGE (company)-[:HIRES_FOR]->(career)

      MATCH (company:Company {name: 'AppForge'})
      MATCH (career:Career {title: 'Frontend Developer'})
      MERGE (company)-[:HIRES_FOR]->(career)

      MATCH (company:Company {name: 'CloudWorks'})
      MATCH (career:Career {title: 'DevOps Engineer'})
      MERGE (company)-[:HIRES_FOR]->(career)

      MATCH (company:Company {name: 'DataSphere'})
      MATCH (career:Career {title: 'Data Engineer'})
      MERGE (company)-[:HIRES_FOR]->(career)

      MATCH (company:Company {name: 'FinStack'})
      MATCH (career:Career {title: 'Backend Developer'})
      MERGE (company)-[:HIRES_FOR]->(career)
    `);

    // ============================================================
    // 12. COMPANY -> TECHNOLOGY
    // ============================================================

    console.log("Creating Company -> Technology relationships...");

    await session.run(`
      MATCH (company:Company {name: 'TechNova'})
      MATCH (technology:Technology {name: 'React'})
      MERGE (company)-[:USES]->(technology)

      MATCH (company:Company {name: 'TechNova'})
      MATCH (technology:Technology {name: 'Node.js'})
      MERGE (company)-[:USES]->(technology)

      MATCH (company:Company {name: 'TechNova'})
      MATCH (technology:Technology {name: 'MongoDB'})
      MERGE (company)-[:USES]->(technology)

      MATCH (company:Company {name: 'CloudWorks'})
      MATCH (technology:Technology {name: 'AWS'})
      MERGE (company)-[:USES]->(technology)

      MATCH (company:Company {name: 'CloudWorks'})
      MATCH (technology:Technology {name: 'Docker'})
      MERGE (company)-[:USES]->(technology)

      MATCH (company:Company {name: 'DataSphere'})
      MATCH (technology:Technology {name: 'PostgreSQL'})
      MERGE (company)-[:USES]->(technology)

      MATCH (company:Company {name: 'FinStack'})
      MATCH (technology:Technology {name: 'Node.js'})
      MERGE (company)-[:USES]->(technology)

      MATCH (company:Company {name: 'FinStack'})
      MATCH (technology:Technology {name: 'PostgreSQL'})
      MERGE (company)-[:USES]->(technology)

      MATCH (company:Company {name: 'AppForge'})
      MATCH (technology:Technology {name: 'React'})
      MERGE (company)-[:USES]->(technology)
    `);

    console.log("\n✅ Database seeded successfully!");
  } catch (error) {
    console.error("\n❌ Seed failed:");
    console.error(error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();