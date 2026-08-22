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
    console.log("\n🌱 Starting database seed...\n");

    // ============================================================
    // 1. CAREERS
    // ============================================================

    console.log("Creating careers...");

    await session.run(`
      UNWIND [
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'DevOps Engineer',
        'Data Engineer'
      ] AS title

      MERGE (:Career {title: title})
    `);

    // ============================================================
    // 2. SKILLS
    // ============================================================

    console.log("Creating skills...");

    await session.run(`
      UNWIND [
        'JavaScript',
        'React',
        'Node.js',
        'Express.js',
        'Git',
        'REST APIs',
        'Docker',
        'SQL',
        'Python',
        'AWS'
      ] AS name

      MERGE (:Skill {name: name})
    `);

    // ============================================================
    // 3. TECHNOLOGIES
    // ============================================================

    console.log("Creating technologies...");

    await session.run(`
      UNWIND [
        {name: 'React', type: 'Frontend Framework'},
        {name: 'Node.js', type: 'Runtime'},
        {name: 'MongoDB', type: 'Database'},
        {name: 'PostgreSQL', type: 'Database'},
        {name: 'Docker', type: 'Containerization'},
        {name: 'AWS', type: 'Cloud'}
      ] AS technology

      MERGE (t:Technology {name: technology.name})
      SET t.type = technology.type
    `);

    // ============================================================
    // 4. PROJECTS
    // ============================================================

    console.log("Creating projects...");

    await session.run(`
      UNWIND [
        {
          name: 'E-Commerce Platform',
          difficulty: 'Advanced'
        },
        {
          name: 'Real-Time Chat Application',
          difficulty: 'Intermediate'
        },
        {
          name: 'Job Portal',
          difficulty: 'Advanced'
        },
        {
          name: 'URL Shortener',
          difficulty: 'Beginner'
        },
        {
          name: 'Expense Tracker',
          difficulty: 'Beginner'
        }
      ] AS project

      MERGE (p:Project {name: project.name})
      SET p.difficulty = project.difficulty
    `);

    // ============================================================
    // 5. COMPANIES
    // ============================================================

    console.log("Creating companies...");

    await session.run(`
      UNWIND [
        {
          name: 'TechNova',
          location: 'Pune',
          industry: 'Software'
        },
        {
          name: 'CloudWorks',
          location: 'Mumbai',
          industry: 'Cloud Technology'
        },
        {
          name: 'DataSphere',
          location: 'Bangalore',
          industry: 'Data Technology'
        },
        {
          name: 'FinStack',
          location: 'Mumbai',
          industry: 'FinTech'
        },
        {
          name: 'AppForge',
          location: 'Pune',
          industry: 'Software'
        }
      ] AS company

      MERGE (c:Company {name: company.name})
      SET
        c.location = company.location,
        c.industry = company.industry
    `);

    // ============================================================
    // 6. CAREER -> SKILL
    // ============================================================

    console.log("Creating Career -> Skill relationships...");

    await session.run(`
      UNWIND [
        ['Full Stack Developer', 'JavaScript'],
        ['Full Stack Developer', 'React'],
        ['Full Stack Developer', 'Node.js'],
        ['Full Stack Developer', 'Express.js'],
        ['Full Stack Developer', 'Git'],

        ['Frontend Developer', 'JavaScript'],
        ['Frontend Developer', 'React'],
        ['Frontend Developer', 'Git'],

        ['Backend Developer', 'Node.js'],
        ['Backend Developer', 'Express.js'],
        ['Backend Developer', 'REST APIs'],
        ['Backend Developer', 'SQL'],

        ['DevOps Engineer', 'Docker'],
        ['DevOps Engineer', 'AWS'],
        ['DevOps Engineer', 'Git'],

        ['Data Engineer', 'Python'],
        ['Data Engineer', 'SQL'],
        ['Data Engineer', 'AWS']
      ] AS relationship

      MATCH (c:Career {title: relationship[0]})
      MATCH (s:Skill {name: relationship[1]})

      MERGE (c)-[:REQUIRES]->(s)
    `);

    // ============================================================
    // 7. SKILL -> SKILL
    // ============================================================

    console.log("Creating Skill -> Skill relationships...");

    await session.run(`
      UNWIND [
        ['JavaScript', 'React'],
        ['JavaScript', 'Node.js'],
        ['Node.js', 'Express.js'],
        ['React', 'JavaScript'],
        ['Node.js', 'REST APIs'],
        ['Docker', 'AWS'],
        ['Python', 'SQL'],
        ['SQL', 'AWS']
      ] AS relationship

      MATCH (a:Skill {name: relationship[0]})
      MATCH (b:Skill {name: relationship[1]})

      MERGE (a)-[:RELATED_TO]->(b)
    `);

    // ============================================================
    // 8. SKILL -> TECHNOLOGY
    // ============================================================

    console.log("Creating Skill -> Technology relationships...");

    await session.run(`
      UNWIND [
        ['React', 'React'],
        ['Node.js', 'Node.js'],
        ['Docker', 'Docker'],
        ['AWS', 'AWS'],
        ['SQL', 'PostgreSQL']
      ] AS relationship

      MATCH (s:Skill {name: relationship[0]})
      MATCH (t:Technology {name: relationship[1]})

      MERGE (s)-[:USES]->(t)
    `);

    // ============================================================
    // 9. PROJECT -> SKILL
    // ============================================================

    console.log("Creating Project -> Skill relationships...");

    await session.run(`
      UNWIND [
        ['E-Commerce Platform', 'JavaScript'],
        ['E-Commerce Platform', 'React'],
        ['E-Commerce Platform', 'Node.js'],
        ['E-Commerce Platform', 'REST APIs'],

        ['Real-Time Chat Application', 'JavaScript'],
        ['Real-Time Chat Application', 'React'],
        ['Real-Time Chat Application', 'Node.js'],

        ['Job Portal', 'JavaScript'],
        ['Job Portal', 'React'],
        ['Job Portal', 'Node.js'],

        ['URL Shortener', 'Node.js'],
        ['URL Shortener', 'REST APIs'],

        ['Expense Tracker', 'JavaScript'],
        ['Expense Tracker', 'SQL']
      ] AS relationship

      MATCH (p:Project {name: relationship[0]})
      MATCH (s:Skill {name: relationship[1]})

      MERGE (p)-[:REQUIRES]->(s)
    `);

    // ============================================================
    // 10. CAREER -> PROJECT
    // ============================================================

    console.log("Creating Career -> Project relationships...");

    await session.run(`
      UNWIND [
        ['Full Stack Developer', 'E-Commerce Platform'],
        ['Full Stack Developer', 'Real-Time Chat Application'],
        ['Full Stack Developer', 'Job Portal'],

        ['Frontend Developer', 'Real-Time Chat Application'],

        ['Backend Developer', 'URL Shortener'],
        ['Backend Developer', 'Job Portal'],

        ['Data Engineer', 'Expense Tracker']
      ] AS relationship

      MATCH (c:Career {title: relationship[0]})
      MATCH (p:Project {name: relationship[1]})

      MERGE (c)-[:RECOMMENDS]->(p)
    `);

    // ============================================================
    // 11. COMPANY -> CAREER
    // ============================================================

    console.log("Creating Company -> Career relationships...");

    await session.run(`
      UNWIND [
        ['TechNova', 'Full Stack Developer'],
        ['TechNova', 'Backend Developer'],

        ['AppForge', 'Frontend Developer'],

        ['CloudWorks', 'DevOps Engineer'],

        ['DataSphere', 'Data Engineer'],

        ['FinStack', 'Backend Developer']
      ] AS relationship

      MATCH (company:Company {name: relationship[0]})
      MATCH (career:Career {title: relationship[1]})

      MERGE (company)-[:HIRES_FOR]->(career)
    `);

    // ============================================================
    // 12. COMPANY -> TECHNOLOGY
    // ============================================================

    console.log("Creating Company -> Technology relationships...");

    await session.run(`
      UNWIND [
        ['TechNova', 'React'],
        ['TechNova', 'Node.js'],
        ['TechNova', 'MongoDB'],

        ['CloudWorks', 'AWS'],
        ['CloudWorks', 'Docker'],

        ['DataSphere', 'PostgreSQL'],

        ['FinStack', 'Node.js'],
        ['FinStack', 'PostgreSQL'],

        ['AppForge', 'React']
      ] AS relationship

      MATCH (company:Company {name: relationship[0]})
      MATCH (technology:Technology {name: relationship[1]})

      MERGE (company)-[:USES]->(technology)
    `);

    console.log("\n✅ Database seeded successfully!\n");

  } catch (error) {
    console.error("\n❌ Seed failed:");
    console.error(error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();