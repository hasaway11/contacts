import { useNavigate } from "react-router-dom";
import useInput from '../hooks/useInput';
import useProfile from '../hooks/useProfile';
import ProfileField from '../components/ProfileField';
import InputField from '../components/InputField';
import { create, createPhoto } from "../utils/api";
import { AsyncStatus } from "../utils/constants";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Alert } from "react-bootstrap";

function ContactWrite() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [error, setError] = useState(null);

  const nameInput = useInput();
  const telInput = useInput();
  const addressInput = useInput();
  const { profile, previewUrl, handleFileChange } = useProfile();

  const handleCreate = async () => {
    if(status === AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = nameInput.check();
    const r2 = telInput.check();
    const r3 = addressInput.check();

    if (!(r1&&r2&&r3)) 
      return;

    try {
      const obj = { name: nameInput.value, address: addressInput.value, tel: telInput.value };
      const response = await create(obj)
      const newNo = response.data.no;

      if (profile) {
        const formData = new FormData();
        formData.append('photo', profile);
        await createPhoto(formData, newNo);
      }
      navigate(`/read?no=${newNo}`);
      return;
    } catch (error) {
      setStatus(AsyncStatus.FAIL);
      setError(error.message);
    }
  };

  if(status===AsyncStatus.SUBMITTING) return <LoadingSpinner />

  return (
    <>
      {status===AsyncStatus.FAIL && <Alert variant='danger'>{error}</Alert>}
      <ProfileField name="profile" label="프로필" alt="미리보기" previewUrl={previewUrl} onChange={handleFileChange} />
      <InputField name="name" label="이름" type="text" {...nameInput} />
      <InputField name="address" label="주소" type="text" {...addressInput} />
      <InputField name="tel" label="연락처" type="text" {...telInput} />
      <div className="d-grid gap-3">
        <button type="button" id="add" className="btn btn-outline-primary btn-block" onClick={handleCreate}>
          추가
        </button>
      </div>
    </>
  )
}

export default ContactWrite