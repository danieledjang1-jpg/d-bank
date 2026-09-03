const Checkbox = ({ label }) => {
  return (
    <label className="checkbox">
      <input type="checkbox" />

      <span>{label}</span>
    </label>
  );
};

export default Checkbox;