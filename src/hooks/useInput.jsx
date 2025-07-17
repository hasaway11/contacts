import { useState } from 'react'

const titles = {name:'이름은', address:'주소는', tel:'연락처는'};
const patterns = {name:/^[가-힣]{3,10}$/, tel:/^[0-9-]{11,13}$/, address:/^[가-힣\s]{3,10}$/}
const messages = {name:'이름은 한글 3~10글자입니다', tel:'연락처는 정확히 입력하세요', address:'연락처는 한글 3~10글자입니다'};

function useInput(name, ref) {
  const [message, setMessage] = useState('');
  
  const check=()=>{
    const value = ref.current?.value || '';
    setMessage('');
    if(value==='') {
      setMessage(`${titles[name]} 필수입력입니다`);
      return false;
    } else if(!patterns[name].test(value)) {
      setMessage(messages[name]);
      return false;
    }
    return true;
  }
  
  return { message, check};
}

export default useInput