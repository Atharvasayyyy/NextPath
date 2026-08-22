import { useEffect, useState } from "react";
import { exploreSkill } from "../services/api";

function SkillExplorer({
  skill,
  onClose,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!skill) {
      return;
    }

    const loadSkill = async () => {
      try {
        setLoading(true);
        setError("");
        setData(null);

        console.log(
          "Exploring skill:",
          skill.name
        );

        const response =
          await exploreSkill(
            skill.name
          );

        console.log(
          "Skill exploration response:",
          response
        );

        setData(response.data);

      } catch (error) {
        console.error(
          "Skill exploration failed:",
          error
        );

        setError(
          "Unable to explore this skill."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSkill();
  }, [skill]);

  if (!skill) {
    return null;
  }

  return (
    <aside className="skill-explorer">

      {/* HEADER */}

      <div className="skill-explorer-header">

        <div>
          <span className="skill-explorer-label">
            AI SKILL EXPLORER
          </span>

          <h2>
            {skill.name}
          </h2>
        </div>

        <button
          className="skill-explorer-close"
          onClick={onClose}
        >
          ×
        </button>

      </div>

      {/* LOADING */}

      {loading && (
        <div className="skill-explorer-loading">

          <div className="ai-loader">
            ✦
          </div>

          <h3>
            Exploring {skill.name}
          </h3>

          <p>
            Finding learning resources
            and analyzing the skill...
          </p>

        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="skill-explorer-error">
          {error}
        </div>
      )}

      {/* CONTENT */}

      {!loading && data && (
        <div className="skill-explorer-content">

          {/* DIFFICULTY */}

          {data.analysis?.difficulty && (
            <div className="skill-meta">

              <span>
                DIFFICULTY
              </span>

              <strong>
                {data.analysis.difficulty}
              </strong>

            </div>
          )}

          {/* SUMMARY */}

          {data.analysis?.summary && (
            <section className="explorer-section">

              <span className="explorer-section-label">
                ABOUT
              </span>

              <p>
                {data.analysis.summary}
              </p>

            </section>
          )}

          {/* WHY LEARN */}

          {data.analysis?.whyLearn?.length > 0 && (
            <section className="explorer-section">

              <span className="explorer-section-label">
                WHY LEARN IT?
              </span>

              <ul className="explorer-list">

                {data.analysis.whyLearn.map(
                  (reason, index) => (
                    <li key={index}>
                      {reason}
                    </li>
                  )
                )}

              </ul>

            </section>
          )}

          {/* PREREQUISITES */}

          {data.analysis?.prerequisites?.length > 0 && (
            <section className="explorer-section">

              <span className="explorer-section-label">
                PREREQUISITES
              </span>

              <div className="explorer-tags">

                {data.analysis.prerequisites.map(
                  (item, index) => (
                    <span key={index}>
                      {item}
                    </span>
                  )
                )}

              </div>

            </section>
          )}

          {/* CAREER USES */}

          {data.analysis?.careerUses?.length > 0 && (
            <section className="explorer-section">

              <span className="explorer-section-label">
                CAREER OPPORTUNITIES
              </span>

              <div className="career-use-list">

                {data.analysis.careerUses.map(
                  (career, index) => (
                    <div
                      key={index}
                      className="career-use"
                    >
                      <span>→</span>
                      {career}
                    </div>
                  )
                )}

              </div>

            </section>
          )}

          {/* SALARY */}

          {data.analysis?.salaryIndia && (
            <section className="explorer-section">

              <span className="explorer-section-label">
                ESTIMATED INDIA SALARY
              </span>

              <div className="salary-grid">

                <div>
                  <small>
                    ENTRY
                  </small>

                  <strong>
                    {
                      data.analysis
                        .salaryIndia
                        .entryLevel
                    }
                  </strong>
                </div>

                <div>
                  <small>
                    MID
                  </small>

                  <strong>
                    {
                      data.analysis
                        .salaryIndia
                        .midLevel
                    }
                  </strong>
                </div>

                <div>
                  <small>
                    SENIOR
                  </small>

                  <strong>
                    {
                      data.analysis
                        .salaryIndia
                        .seniorLevel
                    }
                  </strong>
                </div>

              </div>

              <p className="salary-note">
                AI-generated estimate.
                Actual compensation varies
                by company, location,
                experience and role.
              </p>

            </section>
          )}

          {/* FUTURE SCOPE */}

          {data.analysis?.futureScope && (
            <section className="explorer-section">

              <span className="explorer-section-label">
                FUTURE SCOPE
              </span>

              <p>
                {data.analysis.futureScope}
              </p>

            </section>
          )}

          {/* YOUTUBE */}

          <section className="explorer-section">

            <div className="resource-heading">

              <div>
                <span className="explorer-section-label">
                  LEARN ON YOUTUBE
                </span>

                <h3>
                  Recommended Playlists
                </h3>
              </div>

              <span className="youtube-badge">
                YouTube
              </span>

            </div>

            {data.resources?.youtube?.length > 0 ? (

              <div className="youtube-list">

                {data.resources.youtube.map(
                  (playlist) => (

                    <a
                      key={playlist.youtubeId}
                      href={playlist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="youtube-card"
                    >

                      <img
                        src={playlist.thumbnail}
                        alt=""
                      />

                      <div className="youtube-info">

                        <strong>
                          {playlist.title}
                        </strong>

                        <span>
                          {playlist.channel}
                        </span>

                      </div>

                      <span className="youtube-arrow">
                        ↗
                      </span>

                    </a>

                  )
                )}

              </div>

            ) : (

              <p className="empty-resources">
                No YouTube playlists
                found.
              </p>

            )}

          </section>

        </div>
      )}

    </aside>
  );
}

export default SkillExplorer;