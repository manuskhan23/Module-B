const Input = ({ label, type, value, onChange, name }) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control"
        placeholder={label}
        value={value}
        name={name}
        onChange={onChange}
        required
      />
      <label>{label}</label>
    </div>
  );
};

export default Input;
