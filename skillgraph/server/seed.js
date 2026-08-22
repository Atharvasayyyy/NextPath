const dotenv = require("dotenv");
const neo4j = require("neo4j-driver");

dotenv.config();

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

async function seed() {
  const session = driver.session();

  try {
    console.log("Clearing existing graph...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("Creating Full Stack roadmap...");

    await session.run(
      `
      // =====================================================
      // CAREER
      // =====================================================

      CREATE (career:Career {
        title: "Full Stack Developer",
        description: "A developer who builds complete web applications across frontend, backend, databases and deployment."
      })

      // =====================================================
      // STAGES
      // =====================================================

      CREATE
        (foundation:Stage {
          name: "Foundations",
          order: 1
        }),

        (frontend:Stage {
          name: "Frontend",
          order: 2
        }),

        (backend:Stage {
          name: "Backend",
          order: 3
        }),

        (database:Stage {
          name: "Database",
          order: 4
        }),

        (devops:Stage {
          name: "DevOps",
          order: 5
        })

      // =====================================================
      // CAREER -> STAGES
      // =====================================================

      CREATE
        (career)-[:HAS_STAGE]->(foundation),
        (career)-[:HAS_STAGE]->(frontend),
        (career)-[:HAS_STAGE]->(backend),
        (career)-[:HAS_STAGE]->(database),
        (career)-[:HAS_STAGE]->(devops)
      `
    );

    // =========================================================
    // FOUNDATION SKILLS
    // =========================================================

    await session.run(`
      MATCH (stage:Stage {name: "Foundations"})

      CREATE
        (internet:Skill {
          name: "Internet",
          difficulty: "Beginner",
          description: "Understand how the web, browsers, servers and HTTP work."
        }),

        (html:Skill {
          name: "HTML",
          difficulty: "Beginner",
          description: "Structure web pages using semantic HTML."
        }),

        (css:Skill {
          name: "CSS",
          difficulty: "Beginner",
          description: "Style responsive and accessible web interfaces."
        }),

        (javascript:Skill {
          name: "JavaScript",
          difficulty: "Intermediate",
          description: "Build interactive applications using modern JavaScript."
        })

      CREATE
        (stage)-[:CONTAINS]->(internet),
        (stage)-[:CONTAINS]->(html),
        (stage)-[:CONTAINS]->(css),
        (stage)-[:CONTAINS]->(javascript)

      CREATE
        (internet)-[:LEADS_TO]->(html),
        (html)-[:LEADS_TO]->(css),
        (css)-[:LEADS_TO]->(javascript)
    `);

    // =========================================================
    // FRONTEND SKILLS
    // =========================================================

    await session.run(`
      MATCH (stage:Stage {name: "Frontend"})

      CREATE
        (react:Skill {
          name: "React",
          difficulty: "Intermediate",
          description: "Build component-based user interfaces with React."
        }),

        (router:Skill {
          name: "React Router",
          difficulty: "Intermediate",
          description: "Implement client-side navigation in React applications."
        }),

        (apiIntegration:Skill {
          name: "API Integration",
          difficulty: "Intermediate",
          description: "Connect frontend applications with backend APIs."
        }),

        (stateManagement:Skill {
          name: "State Management",
          difficulty: "Intermediate",
          description: "Manage application state across React components."
        })

      CREATE
        (stage)-[:CONTAINS]->(react),
        (stage)-[:CONTAINS]->(router),
        (stage)-[:CONTAINS]->(apiIntegration),
        (stage)-[:CONTAINS]->(stateManagement)

      WITH react, router, apiIntegration, stateManagement

      MATCH
        (javascript:Skill {name: "JavaScript"})

      CREATE
        (javascript)-[:LEADS_TO]->(react)

      CREATE
        (react)-[:LEADS_TO]->(router),
        (react)-[:LEADS_TO]->(stateManagement),
        (router)-[:LEADS_TO]->(apiIntegration)
    `);

    // =========================================================
    // BACKEND SKILLS
    // =========================================================

    await session.run(`
      MATCH (stage:Stage {name: "Backend"})

      CREATE
        (nodejs:Skill {
          name: "Node.js",
          difficulty: "Intermediate",
          description: "Run JavaScript on the server using Node.js."
        }),

        (express:Skill {
          name: "Express.js",
          difficulty: "Intermediate",
          description: "Build backend services and REST APIs with Express."
        }),

        (rest:Skill {
          name: "REST API",
          difficulty: "Intermediate",
          description: "Design and build RESTful backend APIs."
        }),

        (authentication:Skill {
          name: "Authentication",
          difficulty: "Intermediate",
          description: "Implement login, registration, JWT and authorization."
        })

      CREATE
        (stage)-[:CONTAINS]->(nodejs),
        (stage)-[:CONTAINS]->(express),
        (stage)-[:CONTAINS]->(rest),
        (stage)-[:CONTAINS]->(authentication)

      WITH nodejs, express, rest, authentication

      MATCH
        (javascript:Skill {name: "JavaScript"})

      CREATE
        (javascript)-[:LEADS_TO]->(nodejs)

      CREATE
        (nodejs)-[:LEADS_TO]->(express),
        (express)-[:LEADS_TO]->(rest),
        (rest)-[:LEADS_TO]->(authentication)
    `);

    // =========================================================
    // DATABASE SKILLS
    // =========================================================

    await session.run(`
      MATCH (stage:Stage {name: "Database"})

      CREATE
        (mongodbSkill:Skill {
          name: "MongoDB",
          difficulty: "Intermediate",
          description: "Work with document-oriented databases."
        }),

        (postgresqlSkill:Skill {
          name: "PostgreSQL",
          difficulty: "Intermediate",
          description: "Work with relational SQL databases."
        }),

        (redisSkill:Skill {
          name: "Redis",
          difficulty: "Advanced",
          description: "Use an in-memory data store for caching and fast access."
        }),

        (databaseDesign:Skill {
          name: "Database Design",
          difficulty: "Intermediate",
          description: "Design schemas, relationships, indexes and queries."
        })

      CREATE
        (stage)-[:CONTAINS]->(mongodbSkill),
        (stage)-[:CONTAINS]->(postgresqlSkill),
        (stage)-[:CONTAINS]->(redisSkill),
        (stage)-[:CONTAINS]->(databaseDesign)

      WITH
        mongodbSkill,
        postgresqlSkill,
        redisSkill,
        databaseDesign

      MATCH
        (rest:Skill {name: "REST API"})

      CREATE
        (rest)-[:LEADS_TO]->(databaseDesign)

      CREATE
        (databaseDesign)-[:LEADS_TO]->(mongodbSkill),
        (databaseDesign)-[:LEADS_TO]->(postgresqlSkill),
        (mongodbSkill)-[:LEADS_TO]->(redisSkill)
    `);

    // =========================================================
    // DEVOPS SKILLS
    // =========================================================

    await session.run(`
      MATCH (stage:Stage {name: "DevOps"})

      CREATE
        (git:Skill {
          name: "Git",
          difficulty: "Beginner",
          description: "Track source code changes and collaborate with Git."
        }),

        (docker:Skill {
          name: "Docker",
          difficulty: "Intermediate",
          description: "Containerize and run applications consistently."
        }),

        (cicd:Skill {
          name: "CI/CD",
          difficulty: "Intermediate",
          description: "Automate testing, building and deployment."
        }),

        (aws:Skill {
          name: "AWS",
          difficulty: "Advanced",
          description: "Deploy and operate applications using AWS services."
        })

      CREATE
        (stage)-[:CONTAINS]->(git),
        (stage)-[:CONTAINS]->(docker),
        (stage)-[:CONTAINS]->(cicd),
        (stage)-[:CONTAINS]->(aws)

      WITH git, docker, cicd, aws

      MATCH
        (rest:Skill {name: "REST API"})

      CREATE
        (rest)-[:LEADS_TO]->(git)

      CREATE
        (git)-[:LEADS_TO]->(docker),
        (docker)-[:LEADS_TO]->(cicd),
        (cicd)-[:LEADS_TO]->(aws)
    `);

    // =========================================================
    // TECHNOLOGIES
    // =========================================================

    await session.run(`
      MATCH (javascript:Skill {name: "JavaScript"})
      MATCH (react:Skill {name: "React"})
      MATCH (nodejs:Skill {name: "Node.js"})
      MATCH (express:Skill {name: "Express.js"})
      MATCH (mongodb:Skill {name: "MongoDB"})
      MATCH (postgresql:Skill {name: "PostgreSQL"})
      MATCH (redis:Skill {name: "Redis"})
      MATCH (docker:Skill {name: "Docker"})
      MATCH (aws:Skill {name: "AWS"})

      CREATE
        (javascriptTech:Technology {
          name: "JavaScript",
          category: "Programming Language"
        }),

        (reactTech:Technology {
          name: "React.js",
          category: "Frontend Framework"
        }),

        (nodeTech:Technology {
          name: "Node.js",
          category: "Backend Runtime"
        }),

        (expressTech:Technology {
          name: "Express.js",
          category: "Backend Framework"
        }),

        (mongoTech:Technology {
          name: "MongoDB",
          category: "Database"
        }),

        (postgresTech:Technology {
          name: "PostgreSQL",
          category: "Database"
        }),

        (redisTech:Technology {
          name: "Redis",
          category: "Cache"
        }),

        (dockerTech:Technology {
          name: "Docker",
          category: "Containerization"
        }),

        (awsTech:Technology {
          name: "AWS",
          category: "Cloud"
        })

      CREATE
        (javascript)-[:USES]->(javascriptTech),
        (react)-[:USES]->(reactTech),
        (nodejs)-[:USES]->(nodeTech),
        (express)-[:USES]->(expressTech),
        (mongodb)-[:USES]->(mongoTech),
        (postgresql)-[:USES]->(postgresTech),
        (redis)-[:USES]->(redisTech),
        (docker)-[:USES]->(dockerTech),
        (aws)-[:USES]->(awsTech)
    `);

    // =========================================================
    // PROJECTS
    // =========================================================

    await session.run(`
      MATCH (career:Career {
        title: "Full Stack Developer"
      })

      MATCH (javascript:Skill {
        name: "JavaScript"
      })

      MATCH (react:Skill {
        name: "React"
      })

      MATCH (nodejs:Skill {
        name: "Node.js"
      })

      MATCH (express:Skill {
        name: "Express.js"
      })

      MATCH (mongodb:Skill {
        name: "MongoDB"
      })

      MATCH (authentication:Skill {
        name: "Authentication"
      })

      CREATE
        (todo:Project {
          name: "Todo Application",
          difficulty: "Beginner",
          description: "Build a CRUD application with React."
        }),

        (ecommerce:Project {
          name: "E-Commerce Platform",
          difficulty: "Advanced",
          description: "Build a complete shopping platform."
        }),

        (chat:Project {
          name: "Real-Time Chat Application",
          difficulty: "Advanced",
          description: "Build a real-time messaging application."
        }),

        (jobPortal:Project {
          name: "Job Portal",
          difficulty: "Advanced",
          description: "Build a full-stack job discovery platform."
        })

      CREATE
        (career)-[:HAS_PROJECT]->(todo),
        (career)-[:HAS_PROJECT]->(ecommerce),
        (career)-[:HAS_PROJECT]->(chat),
        (career)-[:HAS_PROJECT]->(jobPortal)

      CREATE
        (todo)-[:REQUIRES]->(javascript),
        (todo)-[:REQUIRES]->(react),

        (ecommerce)-[:REQUIRES]->(javascript),
        (ecommerce)-[:REQUIRES]->(react),
        (ecommerce)-[:REQUIRES]->(nodejs),
        (ecommerce)-[:REQUIRES]->(express),
        (ecommerce)-[:REQUIRES]->(mongodb),
        (ecommerce)-[:REQUIRES]->(authentication),

        (chat)-[:REQUIRES]->(react),
        (chat)-[:REQUIRES]->(nodejs),
        (chat)-[:REQUIRES]->(express),

        (jobPortal)-[:REQUIRES]->(react),
        (jobPortal)-[:REQUIRES]->(nodejs),
        (jobPortal)-[:REQUIRES]->(mongodb),
        (jobPortal)-[:REQUIRES]->(authentication)
    `);

    // =========================================================
    // COMPANIES
    // =========================================================

    await session.run(`
      MATCH (career:Career {
        title: "Full Stack Developer"
      })

      CREATE
        (tcs:Company {
          name: "TCS",
          industry: "IT Services",
          location: "India"
        }),

        (infosys:Company {
          name: "Infosys",
          industry: "IT Services",
          location: "India"
        }),

        (wipro:Company {
          name: "Wipro",
          industry: "IT Services",
          location: "India"
        }),

        (techNova:Company {
          name: "TechNova",
          industry: "Software",
          location: "Pune"
        }),

        (startupX:Company {
          name: "StartupX",
          industry: "Software",
          location: "Bengaluru"
        })

      CREATE
        (tcs)-[:HIRES_FOR]->(career),
        (infosys)-[:HIRES_FOR]->(career),
        (wipro)-[:HIRES_FOR]->(career),
        (techNova)-[:HIRES_FOR]->(career),
        (startupX)-[:HIRES_FOR]->(career)
    `);

    // =========================================================
    // JOB SOURCES
    // =========================================================

    await session.run(`
      MATCH (career:Career {
        title: "Full Stack Developer"
      })

      CREATE
        (naukri:JobSource {
          name: "Naukri",
          searchTerm: "Full Stack Developer",
          location: "India",
          lastKnownCount: null
        }),

        (indeed:JobSource {
          name: "Indeed",
          searchTerm: "Full Stack Developer",
          location: "India",
          lastKnownCount: null
        })

      CREATE
        (career)-[:HAS_JOB_SOURCE]->(naukri),
        (career)-[:HAS_JOB_SOURCE]->(indeed)
    `);

    // =========================================================
    // VERIFY
    // =========================================================

    const result = await session.run(`
      MATCH (n)
      RETURN labels(n) AS labels, count(n) AS count
      ORDER BY labels
    `);

    console.log("\n========== NODE COUNTS ==========");

    result.records.forEach((record) => {
      console.log(
        record.get("labels"),
        record.get("count").toNumber()
      );
    });

    const relationshipResult =
      await session.run(`
        MATCH ()-[r]->()
        RETURN type(r) AS relationship, count(r) AS count
        ORDER BY relationship
      `);

    console.log(
      "\n========== RELATIONSHIP COUNTS =========="
    );

    relationshipResult.records.forEach(
      (record) => {
        console.log(
          record.get("relationship"),
          record.get("count").toNumber()
        );
      }
    );

    console.log(
      "\n✅ Full Stack roadmap seeded successfully!"
    );

  } catch (error) {
    console.error(
      "\n❌ SEED ERROR:",
      error
    );
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();