import SkillNode from "./SkillNode";

function RoadmapStage({
  stage,
  onSkillClick,
  isLast,
}) {
  return (
    <section className="roadmap-stage">

      {/* Stage heading */}

      <div className="stage-header">

        <div className="stage-number">
          {stage.order}
        </div>

        <div className="stage-info">
          <span className="stage-label">
            STAGE {stage.order}
          </span>

          <h2>
            {stage.name}
          </h2>

          <p>
            {stage.skills.length} skills to learn
          </p>
        </div>

      </div>


      {/* Connection from stage to skills */}

      <div className="stage-connector">
        <div className="connector-line" />
      </div>


      {/* Skills */}

      <div className="skill-list">

        {stage.skills.map(
          (skill, index) => (
            <div
              className="skill-wrapper"
              key={skill.name}
            >

              <SkillNode
                skill={skill}
                onClick={() =>
                  onSkillClick(skill)
                }
              />

              {/* Connection between skills */}

              {index <
                stage.skills.length - 1 && (
                <div className="skill-connector">
                  <div className="connector-line" />
                </div>
              )}

            </div>
          )
        )}

      </div>


      {/* Connection to next stage */}

      {!isLast && (
        <div className="next-stage-connector">

          <div className="connector-line" />

          <div className="connector-arrow">
            ↓
          </div>

        </div>
      )}

    </section>
  );
}

export default RoadmapStage;