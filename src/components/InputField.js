function InputField({ name, label, type, value, onChange, check, message }) {
  return (
    <div className="mb-3 mt-3">
      <label htmlFor={name} className="form-label">{label}:</label>
      <input type={type} className="form-control" name={name} value={value} onChange={onChange} onBlur={check} />
      {message!=='' && <span style={{color:'red'}}>{message}</span>}
    </div>
  )
}

export default InputField;