import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CareerSelector from "../components/CareerSelector";
import SkillCard from "../components/SkillCard";
import TechnologyCard from "../components/TechnologyCard";
import ProjectCard from "../components/ProjectCard";
import GraphExplorer from "../components/GraphExplorer";


import {
  getCareers,
  getCareerSkills,
  getCareerTechnologies,
  getCareerProjects,
} from "../services/api";

function Home() {
  const [careers, setCareers] = useState([]);

  const [selectedCareer, setSelectedCareer] =
    useState("");

  const [skills, setSkills] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // -----------------------------------------
  // Load careers
  // -----------------------------------------

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const response = await getCareers();

        setCareers(response.data);

        if (response.data.length > 0) {
          setSelectedCareer(
            response.data[0].title
          );
        }
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load careers."
        );
      }
    };

    loadCareers();
  }, []);

  // -----------------------------------------
  // Load career data
  // -----------------------------------------

  useEffect(() => {
    if (!selectedCareer) {
      return;
    }

    const loadCareerData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          skillsResponse,
          technologiesResponse,
          projectsResponse,
        ] = await Promise.all([
          getCareerSkills(selectedCareer),
          getCareerTechnologies(selectedCareer),
          getCareerProjects(selectedCareer),
        ]);

        setSkills(skillsResponse.data);
        setTechnologies(
          technologiesResponse.data
        );
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load career information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCareerData();
  }, [selectedCareer]);

  return (
    <>
      <Navbar />

      <main className="container">

        {/* Hero */}

        <section className="hero">
          <p className="eyebrow">
            CAREER GRAPH EXPLORER
          </p>

          <h1>
            Explore your
            <span> career path.</span>
          </h1>

          <p className="hero-description">
            Discover the skills, technologies and
            projects connected to your career.
          </p>
        </section>

        {/* Selector */}

        <section className="career-section">

          <CareerSelector
            careers={careers}
            selectedCareer={selectedCareer}
            onChange={setSelectedCareer}
          />

        </section>

        {/* Error */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="loading">
            Loading career graph...
          </div>
        ) : (
          <>
            {/* Skills */}

            <section className="content-section">

              <div className="section-heading">
                <div>
                  <p className="section-label">
                    REQUIRED
                  </p>

                  <h2>Skills</h2>
                </div>

                <span>
                  {skills.length} skills
                </span>
              </div>

              <div className="skills-grid">

                {skills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                  />
                ))}

              </div>

            </section>

            {/* Technologies */}

            <section className="content-section">

              <div className="section-heading">
                <div>
                  <p className="section-label">
                    ECOSYSTEM
                  </p>

                  <h2>Technologies</h2>
                </div>

                <span>
                  {technologies.length} technologies
                </span>
              </div>

              <div className="technology-grid">

                {technologies.map(
                  (technology) => (
                    <TechnologyCard
                      key={technology.name}
                      name={technology.name}
                      type={technology.type}
                    />
                  )
                )}

              </div>

            </section>

            {/* Projects */}

            <section className="content-section">

              <div className="section-heading">
                <div>
                  <p className="section-label">
                    BUILD
                  </p>

                  <h2>Recommended Projects</h2>
                </div>

                <span>
                  {projects.length} projects
                </span>
              </div>

              <div className="projects-grid">

                {projects.map((project) => (
                  <ProjectCard
                    key={project.name}
                    name={project.name}
                    difficulty={
                      project.difficulty
                    }
                  />
                ))}

              </div>

            </section>


            <section className="content-section">

  <div className="section-heading">
    <div>
      <p className="section-label">
        GRAPH VIEW
      </p>

      <h2>Career Connections</h2>
    </div>

    <span>
      Interactive graph
    </span>
  </div>

  <GraphExplorer
    career={selectedCareer}
  />

</section>

          </>
        )}

      </main>
    </>
  );
}

export default Home;