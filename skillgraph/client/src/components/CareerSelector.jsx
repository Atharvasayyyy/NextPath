function CareerSelector({
  careers,
  selectedCareer,
  onChange,
}) {
  return (
    <div className="selector-container">
      <label htmlFor="career">
        Choose a career
      </label>

      <select
        id="career"
        value={selectedCareer}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        <option value="">
          Select a career
        </option>

        {careers.map((career) => (
          <option
            key={career.title}
            value={career.title}
          >
            {career.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CareerSelector;