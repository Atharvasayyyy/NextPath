function ProjectCard({
  name,
  difficulty,
}) {
  return (
    <div className="project-card">
      <h3>{name}</h3>

      <span className="difficulty">
        {difficulty}
      </span>
    </div>
  );
}

export default ProjectCard;