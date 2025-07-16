import { useState } from "react"
import { AsyncStatus } from "../utils/constants";

const titles = {name:'이름은', address:'주소는', tel:'연락처는'};
const patterns = {name:/^[가-힣]{3,10}$/, tel:/^[0-9-]{11,13}$/, address:/^[가-힣]{3,10}$/}
const messages = {name:'이름은 한글 3~10글자입니다', tel:'연락처는 정확히 입력하세요', address:'연락처는 한글 3~10글자입니다'};

// 패턴 체크 추가
function ContactWrite() {
  const [data, setData] = useState({name:'', address:'', tel:''});
  const [error, setError] = useState({name:'', address:'', tel:''});
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState(AsyncStatus.IDLE);

  const handleChange=(e)=>{
    const {name, value}=e.target;
    setData(prev=>({...prev, [name]:value}));
  };

  const handleSubmit=()=>{
    setError({name:'', address:'', tel:''});
    const newError = { name: '', address: '', tel: '' };

    Object.keys(data).forEach(key=>{
      if(data[key]==='') {
        newError[key] = `${titles[key]} 필수입력입니다`
      } else if(!patterns[key].test(data[key])) {
        newError[key] = messages[key];
      } 
    });

    setError(newError);
    const isErrorExist = Object.values(newError).some(value=>value!=='');
    if(isErrorExist) {
      setStatus(AsyncStatus.IDLE);
      return;
    }
    alert("서버로 submit합니다");
  };

  const handleBlur=(e)=>{
    const key = e.target.name;
    setError(prev=>({...prev, [key]:''}));
    if(data[key]==='') {
      setError(prev=>({...prev,[key]:`${titles[key]} 필수입력입니다`}));
    } else if(!patterns[key].test(data[key])) {
      setError(prev=>({...prev,[key]:messages[key]}));
    }
  };

  const handlePhotoChange=(e)=>{
    const src = URL.createObjectURL(e.target.files[0]);
    setPreview(src);
  }

  const {name, address, tel} = data;

  return (
    <>
      {preview && <img src={preview} style={{ height: '200px', objectFit: 'cover' }} alt='프로필' />}
      <div className="mb-3 mt-3">
        <label htmlFor={name} className="form-label">프로필:</label>
        <input type="file" className="form-control" name='photo' onChange={handlePhotoChange} />
      </div>
      <div className="mt-3 mb-3">
        <label className="form-label">이름:</label>
        <input type="text" className="form-control" name="name" onChange={handleChange} value={name} onBlur={handleBlur}/>
        {error.name && <span style={{color:'red', fontSize:'0.8em'}}>{error.name}</span>}
      </div>
      <div className="mt-3 mb-3">
        <label className="form-label">연락처:</label>
        <input type="text" className="form-control" name="tel" onChange={handleChange} value={tel} onBlur={handleBlur} />
        {error.tel && <span style={{color:'red', fontSize:'0.8em'}}>{error.tel}</span>}
      </div>
      <div className="mt-3 mb-3">
        <label className="form-label">주소:</label>
        <input type="text" className="form-control" name="address" onChange={handleChange} value={address} onBlur={handleBlur} />
        {error.address && <span style={{color:'red', fontSize:'0.8em'}}>{error.address}</span>}
      </div>
      <div className="d-grid gap-3">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={handleSubmit}>추가</button>
      </div>
    </>
  )
}

export default ContactWrite