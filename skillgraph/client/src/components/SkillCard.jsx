function SkillCard({ name }) {
  return (
    <div className="skill-card">
      <div className="card-icon">
        S
      </div>

      <span>{name}</span>
    </div>
  );
}

export default SkillCard;