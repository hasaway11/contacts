import { useState } from 'react'

function useInput() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onChange = e=>setValue(e.target.value);
  
  const check=()=>{
    if(value=='') {
      setMessage('필수입력입니다');
      return false;
    }
    return true;
  }
  
  return { value, message, onChange, check, setValue };
}

export default useInput