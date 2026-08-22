function SkillDetails({
  skill,
  onClose,
}) {
  return (
    <div className="skill-details">

      {/* CLOSE */}

      <button
        className="details-close"
        onClick={onClose}
      >
        ×
      </button>

      {/* TYPE */}

      <span className="details-type">
        SKILL
      </span>

      {/* NAME */}

      <h2>
        {skill.name}
      </h2>

      {/* DIFFICULTY */}

      {skill.difficulty && (
        <span className="difficulty">
          {skill.difficulty}
        </span>
      )}

      {/* DESCRIPTION */}

      {skill.description && (
        <div className="details-section">

          <h3>
            About
          </h3>

          <p>
            {skill.description}
          </p>

        </div>
      )}

      {/* TECHNOLOGY */}

      {skill.technology && (
        <div className="details-section">

          <h3>
            Technology
          </h3>

          <div className="technology-badge">
            {skill.technology}
          </div>

        </div>
      )}

      {/* RESOURCES */}

      <div className="details-section">

        <h3>
          Learning Resources
        </h3>

        {skill.resources &&
        skill.resources.length > 0 ? (

          <div className="resource-list">

            {skill.resources.map(
              (resource) => (
                <a
                  key={`${resource.provider}-${resource.title}`}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card"
                >

                  <div className="resource-icon">
                    {resource.type ===
                    "Documentation"
                      ? "📖"
                      : resource.type ===
                        "Video"
                      ? "📺"
                      : resource.type ===
                        "Practice"
                      ? "💻"
                      : "🎓"}
                  </div>

                  <div className="resource-info">

                    <strong>
                      {resource.title}
                    </strong>

                    <span>
                      {resource.provider}
                    </span>

                    <small>
                      {resource.type}
                      {resource.free
                        ? " • Free"
                        : ""}
                    </small>

                  </div>

                  <span className="resource-arrow">
                    ↗
                  </span>

                </a>
              )
            )}

          </div>

        ) : (

          <p className="no-resources">
            No resources available
            yet.
          </p>

        )}

      </div>

      {/* COMPLETE */}

      <button className="complete-button">
        ✓ Mark as complete
      </button>

    </div>
  );
}

export default SkillDetails;