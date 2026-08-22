function SkillNode({
  skill,
  onClick,
}) {
  return (
    <button
      className="skill-node"
      onClick={onClick}
    >

      <div className="skill-node-icon">
        ✓
      </div>

      <div className="skill-node-info">

        <strong>
          {skill.name}
        </strong>

        <span>
          {skill.difficulty}
        </span>

      </div>

      {skill.technology && (
        <span className="skill-tech">
          {skill.technology}
        </span>
      )}

      <span className="skill-arrow">
        →
      </span>

    </button>
  );
}

export default SkillNode;

