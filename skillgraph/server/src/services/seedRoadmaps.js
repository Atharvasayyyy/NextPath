require("dotenv").config();

const driver = require("../config/db");

// ============================================================
// ROADMAP DATA
// ============================================================

const roadmaps = [
  // ==========================================================
  // FRONTEND DEVELOPER
  // ==========================================================

  {
    career: "Frontend Developer",

    description:
      "Learn the fundamentals of web development, frontend frameworks, performance, testing and deployment.",

    stages: [
      {
        name: "Web Foundations",
        order: 1,

        skills: [
          {
            name: "HTML",
            difficulty: "Beginner",
            technology: "HTML",
            category: "Markup",
          },
          {
            name: "CSS",
            difficulty: "Beginner",
            technology: "CSS",
            category: "Styling",
          },
          {
            name: "JavaScript",
            difficulty: "Intermediate",
            technology: "JavaScript",
            category: "Programming Language",
          },
        ],
      },

      {
        name: "Frontend Core",
        order: 2,

        skills: [
          {
            name: "DOM",
            difficulty: "Intermediate",
            technology: "JavaScript",
            category: "Web API",
          },
          {
            name: "Async JavaScript",
            difficulty: "Intermediate",
            technology: "JavaScript",
            category: "Programming",
          },
          {
            name: "Fetch API",
            difficulty: "Intermediate",
            technology: "JavaScript",
            category: "Web API",
          },
        ],
      },

      {
        name: "Frontend Framework",
        order: 3,

        skills: [
          {
            name: "React",
            difficulty: "Intermediate",
            technology: "React.js",
            category: "Frontend Framework",
          },
          {
            name: "React Router",
            difficulty: "Intermediate",
            technology: "React Router",
            category: "Routing",
          },
          {
            name: "State Management",
            difficulty: "Intermediate",
            technology: "Redux",
            category: "State Management",
          },
        ],
      },

      {
        name: "Frontend Engineering",
        order: 4,

        skills: [
          {
            name: "TypeScript",
            difficulty: "Intermediate",
            technology: "TypeScript",
            category: "Programming Language",
          },
          {
            name: "Testing",
            difficulty: "Intermediate",
            technology: "Vitest",
            category: "Testing",
          },
          {
            name: "Web Performance",
            difficulty: "Advanced",
            technology: "Lighthouse",
            category: "Performance",
          },
        ],
      },

      {
        name: "Deployment",
        order: 5,

        skills: [
          {
            name: "Git",
            difficulty: "Beginner",
            technology: "Git",
            category: "Version Control",
          },
          {
            name: "GitHub",
            difficulty: "Beginner",
            technology: "GitHub",
            category: "Code Hosting",
          },
          {
            name: "CI/CD",
            difficulty: "Intermediate",
            technology: "GitHub Actions",
            category: "DevOps",
          },
        ],
      },
    ],
  },

  // ==========================================================
  // BACKEND DEVELOPER
  // ==========================================================

  {
    career: "Backend Developer",

    description:
      "Learn server-side programming, APIs, databases, authentication, security and backend architecture.",

    stages: [
      {
        name: "Programming Foundations",
        order: 1,

        skills: [
          {
            name: "JavaScript",
            difficulty: "Intermediate",
            technology: "JavaScript",
            category: "Programming Language",
          },
          {
            name: "Data Structures",
            difficulty: "Intermediate",
            technology: "JavaScript",
            category: "Computer Science",
          },
          {
            name: "Git",
            difficulty: "Beginner",
            technology: "Git",
            category: "Version Control",
          },
        ],
      },

      {
        name: "Backend Runtime",
        order: 2,

        skills: [
          {
            name: "Node.js",
            difficulty: "Intermediate",
            technology: "Node.js",
            category: "Backend Runtime",
          },
          {
            name: "npm",
            difficulty: "Beginner",
            technology: "npm",
            category: "Package Manager",
          },
          {
            name: "Express.js",
            difficulty: "Intermediate",
            technology: "Express.js",
            category: "Backend Framework",
          },
        ],
      },

      {
        name: "APIs",
        order: 3,

        skills: [
          {
            name: "HTTP",
            difficulty: "Intermediate",
            technology: "HTTP",
            category: "Web Protocol",
          },
          {
            name: "REST API",
            difficulty: "Intermediate",
            technology: "REST",
            category: "API Architecture",
          },
          {
            name: "API Authentication",
            difficulty: "Intermediate",
            technology: "JWT",
            category: "Authentication",
          },
        ],
      },

      {
        name: "Databases",
        order: 4,

        skills: [
          {
            name: "SQL",
            difficulty: "Intermediate",
            technology: "SQL",
            category: "Database",
          },
          {
            name: "PostgreSQL",
            difficulty: "Intermediate",
            technology: "PostgreSQL",
            category: "Relational Database",
          },
          {
            name: "MongoDB",
            difficulty: "Intermediate",
            technology: "MongoDB",
            category: "NoSQL Database",
          },
          {
            name: "Redis",
            difficulty: "Advanced",
            technology: "Redis",
            category: "Cache",
          },
        ],
      },

      {
        name: "Backend Engineering",
        order: 5,

        skills: [
          {
            name: "Security",
            difficulty: "Advanced",
            technology: "OWASP",
            category: "Security",
          },
          {
            name: "Caching",
            difficulty: "Advanced",
            technology: "Redis",
            category: "Performance",
          },
          {
            name: "System Design",
            difficulty: "Advanced",
            technology: "Architecture",
            category: "Architecture",
          },
        ],
      },
    ],
  },

  // ==========================================================
  // DEVOPS ENGINEER
  // ==========================================================

  {
    career: "DevOps Engineer",

    description:
      "Learn Linux, networking, containers, cloud infrastructure, CI/CD, infrastructure as code and monitoring.",

    stages: [
      {
        name: "Foundations",
        order: 1,

        skills: [
          {
            name: "Linux",
            difficulty: "Intermediate",
            technology: "Linux",
            category: "Operating System",
          },
          {
            name: "Shell Scripting",
            difficulty: "Intermediate",
            technology: "Bash",
            category: "Automation",
          },
          {
            name: "Python",
            difficulty: "Intermediate",
            technology: "Python",
            category: "Programming Language",
          },
        ],
      },

      {
        name: "Networking",
        order: 2,

        skills: [
          {
            name: "Networking Fundamentals",
            difficulty: "Intermediate",
            technology: "TCP/IP",
            category: "Networking",
          },
          {
            name: "DNS",
            difficulty: "Intermediate",
            technology: "DNS",
            category: "Networking",
          },
          {
            name: "HTTP",
            difficulty: "Intermediate",
            technology: "HTTP",
            category: "Web Protocol",
          },
        ],
      },

      {
        name: "Containers",
        order: 3,

        skills: [
          {
            name: "Docker",
            difficulty: "Intermediate",
            technology: "Docker",
            category: "Containerization",
          },
          {
            name: "Docker Compose",
            difficulty: "Intermediate",
            technology: "Docker Compose",
            category: "Containerization",
          },
          {
            name: "Kubernetes",
            difficulty: "Advanced",
            technology: "Kubernetes",
            category: "Orchestration",
          },
        ],
      },

      {
        name: "CI/CD",
        order: 4,

        skills: [
          {
            name: "CI/CD",
            difficulty: "Intermediate",
            technology: "GitHub Actions",
            category: "Automation",
          },
          {
            name: "Jenkins",
            difficulty: "Advanced",
            technology: "Jenkins",
            category: "CI/CD",
          },
          {
            name: "Release Automation",
            difficulty: "Advanced",
            technology: "GitHub Actions",
            category: "Deployment",
          },
        ],
      },

      {
        name: "Cloud",
        order: 5,

        skills: [
          {
            name: "AWS",
            difficulty: "Advanced",
            technology: "AWS",
            category: "Cloud",
          },
          {
            name: "Terraform",
            difficulty: "Advanced",
            technology: "Terraform",
            category: "Infrastructure as Code",
          },
          {
            name: "Monitoring",
            difficulty: "Advanced",
            technology: "Prometheus",
            category: "Observability",
          },
          {
            name: "Logging",
            difficulty: "Advanced",
            technology: "Grafana",
            category: "Observability",
          },
        ],
      },
    ],
  },

  // ==========================================================
  // DATA ENGINEER
  // ==========================================================

  {
    career: "Data Engineer",

    description:
      "Learn programming, SQL, data modeling, ETL pipelines, distributed systems, cloud data platforms and orchestration.",

    stages: [
      {
        name: "Programming Foundations",
        order: 1,

        skills: [
          {
            name: "Python",
            difficulty: "Intermediate",
            technology: "Python",
            category: "Programming Language",
          },
          {
            name: "Git",
            difficulty: "Beginner",
            technology: "Git",
            category: "Version Control",
          },
          {
            name: "Linux",
            difficulty: "Intermediate",
            technology: "Linux",
            category: "Operating System",
          },
        ],
      },

      {
        name: "SQL & Databases",
        order: 2,

        skills: [
          {
            name: "SQL",
            difficulty: "Intermediate",
            technology: "SQL",
            category: "Database",
          },
          {
            name: "PostgreSQL",
            difficulty: "Intermediate",
            technology: "PostgreSQL",
            category: "Relational Database",
          },
          {
            name: "Data Modeling",
            difficulty: "Advanced",
            technology: "PostgreSQL",
            category: "Data Architecture",
          },
        ],
      },

      {
        name: "Data Pipelines",
        order: 3,

        skills: [
          {
            name: "ETL",
            difficulty: "Intermediate",
            technology: "Python",
            category: "Data Engineering",
          },
          {
            name: "Apache Airflow",
            difficulty: "Advanced",
            technology: "Airflow",
            category: "Workflow Orchestration",
          },
          {
            name: "Data Quality",
            difficulty: "Advanced",
            technology: "Python",
            category: "Data Engineering",
          },
        ],
      },

      {
        name: "Big Data",
        order: 4,

        skills: [
          {
            name: "Apache Spark",
            difficulty: "Advanced",
            technology: "Spark",
            category: "Big Data",
          },
          {
            name: "Kafka",
            difficulty: "Advanced",
            technology: "Apache Kafka",
            category: "Streaming",
          },
          {
            name: "Distributed Systems",
            difficulty: "Advanced",
            technology: "Spark",
            category: "Architecture",
          },
        ],
      },

      {
        name: "Cloud Data",
        order: 5,

        skills: [
          {
            name: "AWS",
            difficulty: "Advanced",
            technology: "AWS",
            category: "Cloud",
          },
          {
            name: "Data Warehouse",
            difficulty: "Advanced",
            technology: "Snowflake",
            category: "Data Warehouse",
          },
          {
            name: "Data Lake",
            difficulty: "Advanced",
            technology: "Amazon S3",
            category: "Data Storage",
          },
        ],
      },
    ],
  },

  // ==========================================================
  // AI ENGINEER
  // ==========================================================

  {
    career: "AI Engineer",

    description:
      "Learn Python, machine learning, deep learning, NLP, LLMs, AI applications and production AI systems.",

    stages: [
      {
        name: "Programming Foundations",
        order: 1,

        skills: [
          {
            name: "Python",
            difficulty: "Beginner",
            technology: "Python",
            category: "Programming Language",
          },
          {
            name: "NumPy",
            difficulty: "Intermediate",
            technology: "NumPy",
            category: "Data Science",
          },
          {
            name: "Pandas",
            difficulty: "Intermediate",
            technology: "Pandas",
            category: "Data Science",
          },
        ],
      },

      {
        name: "Machine Learning",
        order: 2,

        skills: [
          {
            name: "Statistics",
            difficulty: "Intermediate",
            technology: "Python",
            category: "Mathematics",
          },
          {
            name: "Supervised Learning",
            difficulty: "Intermediate",
            technology: "scikit-learn",
            category: "Machine Learning",
          },
          {
            name: "Unsupervised Learning",
            difficulty: "Intermediate",
            technology: "scikit-learn",
            category: "Machine Learning",
          },
        ],
      },

      {
        name: "Deep Learning",
        order: 3,

        skills: [
          {
            name: "Neural Networks",
            difficulty: "Advanced",
            technology: "PyTorch",
            category: "Deep Learning",
          },
          {
            name: "Deep Learning",
            difficulty: "Advanced",
            technology: "PyTorch",
            category: "Deep Learning",
          },
          {
            name: "Model Training",
            difficulty: "Advanced",
            technology: "PyTorch",
            category: "Machine Learning",
          },
        ],
      },

      {
        name: "Generative AI",
        order: 4,

        skills: [
          {
            name: "Transformers",
            difficulty: "Advanced",
            technology: "Hugging Face",
            category: "NLP",
          },
          {
            name: "LLMs",
            difficulty: "Advanced",
            technology: "Hugging Face",
            category: "Generative AI",
          },
          {
            name: "Prompt Engineering",
            difficulty: "Intermediate",
            technology: "LLM APIs",
            category: "Generative AI",
          },
          {
            name: "RAG",
            difficulty: "Advanced",
            technology: "Vector Database",
            category: "Generative AI",
          },
        ],
      },

      {
        name: "AI Engineering",
        order: 5,

        skills: [
          {
            name: "Model Deployment",
            difficulty: "Advanced",
            technology: "FastAPI",
            category: "MLOps",
          },
          {
            name: "MLOps",
            difficulty: "Advanced",
            technology: "MLflow",
            category: "MLOps",
          },
          {
            name: "AI Applications",
            difficulty: "Advanced",
            technology: "Python",
            category: "AI Engineering",
          },
        ],
      },
    ],
  },
];


// ============================================================
// SEED FUNCTION
// ============================================================

async function seedRoadmaps() {
  const session = driver.session();

  try {
    console.log("\n======================================");
    console.log("       SEEDING ROADMAPS");
    console.log("======================================\n");

    for (const roadmap of roadmaps) {
      console.log(
        `→ ${roadmap.career}`
      );

      // ------------------------------------------------------
      // CAREER
      // ------------------------------------------------------

      await session.run(
        `
        MERGE (c:Career {
          title: $title
        })

        SET c.description = $description

        RETURN c
        `,
        {
          title: roadmap.career,
          description: roadmap.description,
        }
      );

      // ------------------------------------------------------
      // STAGES + SKILLS
      // ------------------------------------------------------

      for (const stage of roadmap.stages) {
        await session.run(
          `
          MATCH (c:Career {
            title: $career
          })

          MERGE (stage:Stage {
            key: $stageKey
          })

          SET
            stage.name = $stageName,
            stage.order = $stageOrder,
            stage.career = $career

          MERGE (c)-[:HAS_STAGE]->(stage)

          RETURN stage
          `,
          {
            career: roadmap.career,
            stageKey:
              `${roadmap.career}::${stage.name}`,
            stageName: stage.name,
            stageOrder: stage.order,
          }
        );

        for (const skill of stage.skills) {
          await session.run(
            `
            MATCH (stage:Stage {
              key: $stageKey
            })

            MERGE (s:Skill {
              name: $skillName
            })

            SET
              s.difficulty = $difficulty,
              s.description = coalesce(
                s.description,
                $description
              )

            MERGE (stage)-[:CONTAINS]->(s)

            WITH s

            OPTIONAL MATCH (t:Technology {
              name: $technology
            })

            FOREACH (
              ignored IN CASE
                WHEN $technology IS NULL
                THEN []
                ELSE [1]
              END |

              MERGE (tech:Technology {
                name: $technology
              })

              SET tech.category = $category

              MERGE (s)-[:USES]->(tech)
            )

            RETURN s
            `,
            {
              stageKey:
                `${roadmap.career}::${stage.name}`,

              skillName: skill.name,

              difficulty:
                skill.difficulty,

              description:
                skill.name,

              technology:
                skill.technology || null,

              category:
                skill.category || null,
            }
          );
        }
      }
    }

    console.log(
      "\n======================================"
    );

    console.log(
      "       ROADMAP SEED COMPLETE"
    );

    console.log(
      "======================================\n"
    );

  } catch (error) {
    console.error(
      "\n❌ ROADMAP SEED FAILED\n"
    );

    console.error(error);

  } finally {
    await session.close();
    await driver.close();
  }
}


// ============================================================
// RUN
// ============================================================

seedRoadmaps();