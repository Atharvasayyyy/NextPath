function TechnologyCard({ name, type }) {
  return (
    <div className="technology-card">
      <div>
        <h3>{name}</h3>
        <p>{type}</p>
      </div>
    </div>
  );
}

export default TechnologyCard;