require("dotenv").config();

const driver = require("../config/db");

// ============================================================
// RESOURCE DATA
// ============================================================

const resources = [
  // ==========================================================
  // JAVASCRIPT
  // ==========================================================

  {
    skill: "JavaScript",
    title: "JavaScript Guide",
    provider: "MDN",
    type: "Documentation",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    free: true,
  },

  {
    skill: "JavaScript",
    title: "JavaScript Full Course",
    provider: "freeCodeCamp",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=freecodecamp+javascript+full+course",
    free: true,
  },

  {
    skill: "JavaScript",
    title: "JavaScript Practice",
    provider: "Exercism",
    type: "Practice",
    url: "https://exercism.org/tracks/javascript",
    free: true,
  },

  // ==========================================================
  // HTML
  // ==========================================================

  {
    skill: "HTML",
    title: "HTML Guide",
    provider: "MDN",
    type: "Documentation",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    free: true,
  },

  {
    skill: "HTML",
    title: "HTML Course",
    provider: "freeCodeCamp",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=freecodecamp+html+full+course",
    free: true,
  },

  // ==========================================================
  // CSS
  // ==========================================================

  {
    skill: "CSS",
    title: "CSS Guide",
    provider: "MDN",
    type: "Documentation",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    free: true,
  },

  {
    skill: "CSS",
    title: "CSS Course",
    provider: "freeCodeCamp",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=freecodecamp+css+full+course",
    free: true,
  },

  // ==========================================================
  // REACT
  // ==========================================================

  {
    skill: "React",
    title: "React Documentation",
    provider: "React",
    type: "Documentation",
    url: "https://react.dev/learn",
    free: true,
  },

  {
    skill: "React",
    title: "React Course",
    provider: "freeCodeCamp",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=freecodecamp+react+course",
    free: true,
  },

  {
    skill: "React",
    title: "React Practice",
    provider: "Frontend Mentor",
    type: "Practice",
    url: "https://www.frontendmentor.io/",
    free: true,
  },

  // ==========================================================
  // NODE.JS
  // ==========================================================

  {
    skill: "Node.js",
    title: "Node.js Documentation",
    provider: "Node.js",
    type: "Documentation",
    url: "https://nodejs.org/docs/latest/api/",
    free: true,
  },

  {
    skill: "Node.js",
    title: "Node.js Course",
    provider: "freeCodeCamp",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=freecodecamp+nodejs+course",
    free: true,
  },

  // ==========================================================
  // EXPRESS.JS
  // ==========================================================

  {
    skill: "Express.js",
    title: "Express.js Documentation",
    provider: "Express",
    type: "Documentation",
    url: "https://expressjs.com/",
    free: true,
  },

  {
    skill: "Express.js",
    title: "Express.js Course",
    provider: "freeCodeCamp",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=freecodecamp+expressjs+course",
    free: true,
  },

  // ==========================================================
  // MONGODB
  // ==========================================================

  {
    skill: "MongoDB",
    title: "MongoDB Documentation",
    provider: "MongoDB",
    type: "Documentation",
    url: "https://www.mongodb.com/docs/",
    free: true,
  },

  {
    skill: "MongoDB",
    title: "MongoDB University",
    provider: "MongoDB",
    type: "Course",
    url: "https://learn.mongodb.com/",
    free: true,
  },

  // ==========================================================
  // POSTGRESQL
  // ==========================================================

  {
    skill: "PostgreSQL",
    title: "PostgreSQL Documentation",
    provider: "PostgreSQL",
    type: "Documentation",
    url: "https://www.postgresql.org/docs/",
    free: true,
  },

  // ==========================================================
  // REDIS
  // ==========================================================

  {
    skill: "Redis",
    title: "Redis Documentation",
    provider: "Redis",
    type: "Documentation",
    url: "https://redis.io/docs/latest/",
    free: true,
  },

  // ==========================================================
  // DOCKER
  // ==========================================================

  {
    skill: "Docker",
    title: "Docker Documentation",
    provider: "Docker",
    type: "Documentation",
    url: "https://docs.docker.com/get-started/",
    free: true,
  },

  {
    skill: "Docker",
    title: "Docker Course",
    provider: "freeCodeCamp",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=freecodecamp+docker+course",
    free: true,
  },

  // ==========================================================
  // KUBERNETES
  // ==========================================================

  {
    skill: "Kubernetes",
    title: "Kubernetes Documentation",
    provider: "Kubernetes",
    type: "Documentation",
    url: "https://kubernetes.io/docs/home/",
    free: true,
  },

  // ==========================================================
  // AWS
  // ==========================================================

  {
    skill: "AWS",
    title: "AWS Documentation",
    provider: "AWS",
    type: "Documentation",
    url: "https://docs.aws.amazon.com/",
    free: true,
  },

  {
    skill: "AWS",
    title: "AWS Skill Builder",
    provider: "AWS",
    type: "Course",
    url: "https://skillbuilder.aws/",
    free: true,
  },

  // ==========================================================
  // PYTHON
  // ==========================================================

  {
    skill: "Python",
    title: "Python Documentation",
    provider: "Python",
    type: "Documentation",
    url: "https://docs.python.org/3/",
    free: true,
  },

  {
    skill: "Python",
    title: "Python Course",
    provider: "freeCodeCamp",
    type: "Video",
    url: "https://www.youtube.com/results?search_query=freecodecamp+python+full+course",
    free: true,
  },

  // ==========================================================
  // NUMPY
  // ==========================================================

  {
    skill: "NumPy",
    title: "NumPy Documentation",
    provider: "NumPy",
    type: "Documentation",
    url: "https://numpy.org/doc/stable/",
    free: true,
  },

  // ==========================================================
  // PANDAS
  // ==========================================================

  {
    skill: "Pandas",
    title: "Pandas Documentation",
    provider: "Pandas",
    type: "Documentation",
    url: "https://pandas.pydata.org/docs/",
    free: true,
  },

  // ==========================================================
  // PYTORCH
  // ==========================================================

  {
    skill: "Neural Networks",
    title: "PyTorch Tutorials",
    provider: "PyTorch",
    type: "Documentation",
    url: "https://docs.pytorch.org/tutorials/",
    free: true,
  },

  {
    skill: "Deep Learning",
    title: "PyTorch Tutorials",
    provider: "PyTorch",
    type: "Documentation",
    url: "https://docs.pytorch.org/tutorials/",
    free: true,
  },

  // ==========================================================
  // HUGGING FACE / LLM
  // ==========================================================

  {
    skill: "Transformers",
    title: "Transformers Documentation",
    provider: "Hugging Face",
    type: "Documentation",
    url: "https://huggingface.co/docs/transformers/",
    free: true,
  },

  {
    skill: "LLMs",
    title: "Hugging Face LLM Course",
    provider: "Hugging Face",
    type: "Course",
    url: "https://huggingface.co/learn/llm-course/",
    free: true,
  },

  // ==========================================================
  // APACHE SPARK
  // ==========================================================

  {
    skill: "Apache Spark",
    title: "Apache Spark Documentation",
    provider: "Apache",
    type: "Documentation",
    url: "https://spark.apache.org/docs/latest/",
    free: true,
  },

  // ==========================================================
  // KAFKA
  // ==========================================================

  {
    skill: "Kafka",
    title: "Apache Kafka Documentation",
    provider: "Apache",
    type: "Documentation",
    url: "https://kafka.apache.org/documentation/",
    free: true,
  },

  // ==========================================================
  // AIRFLOW
  // ==========================================================

  {
    skill: "Apache Airflow",
    title: "Apache Airflow Documentation",
    provider: "Apache",
    type: "Documentation",
    url: "https://airflow.apache.org/docs/",
    free: true,
  },

  // ==========================================================
  // GIT
  // ==========================================================

  {
    skill: "Git",
    title: "Git Documentation",
    provider: "Git",
    type: "Documentation",
    url: "https://git-scm.com/doc",
    free: true,
  },

  {
    skill: "Git",
    title: "Learn Git Branching",
    provider: "Learn Git Branching",
    type: "Practice",
    url: "https://learngitbranching.js.org/",
    free: true,
  },

  // ==========================================================
  // TYPESCRIPT
  // ==========================================================

  {
    skill: "TypeScript",
    title: "TypeScript Documentation",
    provider: "TypeScript",
    type: "Documentation",
    url: "https://www.typescriptlang.org/docs/",
    free: true,
  },
];


// ============================================================
// SEED
// ============================================================

async function seedResources() {
  const session = driver.session();

  try {
    console.log("\n======================================");
    console.log("       SEEDING RESOURCES");
    console.log("======================================\n");

    for (const resource of resources) {
      console.log(
        `→ ${resource.skill} | ${resource.title}`
      );

      await session.run(
        `
        MATCH (s:Skill {
          name: $skill
        })

        MERGE (r:Resource {
          url: $url
        })

        SET
          r.title = $title,
          r.provider = $provider,
          r.type = $type,
          r.free = $free

        MERGE (s)-[:HAS_RESOURCE]->(r)

        RETURN s, r
        `,
        {
          skill: resource.skill,
          title: resource.title,
          provider: resource.provider,
          type: resource.type,
          url: resource.url,
          free: resource.free,
        }
      );
    }

    console.log(
      "\n======================================"
    );

    console.log(
      "       RESOURCE SEED COMPLETE"
    );

    console.log(
      "======================================\n"
    );

  } catch (error) {
    console.error(
      "\n❌ RESOURCE SEED FAILED\n"
    );

    console.error(error);

  } finally {
    await session.close();
    await driver.close();
  }
}

seedResources();