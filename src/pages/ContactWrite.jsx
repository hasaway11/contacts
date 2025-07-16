import { forwardRef, useRef, useState } from "react";

const FormField=forwardRef(({label, type, name, check, message}, ref)=>{
  console.log(`${name}`)
  return (
    <div className="mb-3 mt-3">
      <label className="form-label">{label}:</label>
      <input type={type} className="form-control" name={name} onBlur={check} ref={ref}/>
      {message!=='' && <span style={{color:'red'}}>{message}</span>}
    </div>
  )
});

function useFormInput(ref) {
  const [message, setMessage] = useState('');
  const check=()=>{
    const value = ref.current?.value || '';
    if(value=='') {
      setMessage('필수입력입니다');
      return false;
    }
    return true;
  }
  return { message, check};
}


function ContactWrite() {
  const nameRef = useRef();
  const emailRef = useRef();

  const vNameInput = useFormInput(nameRef);
  const vEmailInput = useFormInput(emailRef);

  const handleSubmit=()=>{
    const r1 = vNameInput.check();
    const r2 = vEmailInput.check();
    if(r1&&r2) 
      alert("submit합니다")
  }

  return (
    <>
      <FormField label='이름' type='text' name='name' check={vNameInput.check} message={vNameInput.message} ref={nameRef} />
      <FormField label='이메일' type='email' name='email' check={vEmailInput.check} message={vEmailInput.message} ref={emailRef} />
      <button onClick={handleSubmit}>보내볼까요</button>
    </>
  )
}

export default ContactWrite