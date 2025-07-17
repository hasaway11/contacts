import { forwardRef } from "react";

const InputField=forwardRef(({name, label, check, message, type='text'}, ref) =>{
  console.log(`${name}`)
  return (
    <div className="mb-3 mt-3">
      <label className="form-label">{label}:</label>
      <input type={type} className="form-control" name={name} onBlur={check} ref={ref}/>
      {message!=='' && <span style={{color:'red'}}>{message}</span>}
    </div>
  )
});

export default InputField;