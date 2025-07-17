import { useNavigate } from "react-router-dom";
import { AsyncStatus } from "../utils/constants";
import { useRef, useState } from "react";
import useInput from "../hooks/useInput";
import LoadingSpinner from "../components/LoadingSpinner";
import InputField from "../components/InputField";
import useProfile from "../hooks/useProfile";
import { Alert } from "react-bootstrap";
import ProfileField from "../components/ProfileField";
import { create, createPhoto } from "../utils/api";


function ContactWrite3() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const telRef = useRef();
  const addressRef = useRef();

  const nameInput = useInput('name', nameRef);
  const telInput = useInput('tel', telRef);
  const addressInput = useInput('address', addressRef);
  const profileInput = useProfile();

  // 서버로 요청을 전송하는 작업의 상태, 실패한 경우 에러 상태.
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [error, setError] = useState(null);
  
  const handleCreate = async () => {
    if(status === AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = nameInput.check();
    const r2 = telInput.check();
    const r3 = addressInput.check();

    if (!(r1&&r2&&r3)) {
      setStatus(AsyncStatus.IDLE);
      return;
    }

    try {
      const obj = { name: nameRef.current.value, address: addressRef.current.value, tel: telRef.current.value };
      const response = await create(obj)
      const newNo = response.data.no;

      if (profileInput.profile) {
        const formData = new FormData();
        formData.append('photo', profileInput.profile);
        await createPhoto(formData, newNo);
        }
        navigate(`/read?no=${newNo}`);
        return;
      } catch (error) {
        setStatus(AsyncStatus.FAIL);
        setError(error.message);
        // 작업이 실패한 경우 이미지 미리보기가 남아있더라...
        profileInput.reset();
      }
  };

  if(status===AsyncStatus.SUBMITTING) return <LoadingSpinner />

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <ProfileField name="profile" label="프로필" alt="미리보기" {...profileInput} />
      <InputField name="name" label="이름" {...nameInput} ref={nameRef} />
      <InputField name="address" label="주소" {...addressInput} ref={addressRef} />
      <InputField name="tel" label="연락처" {...telInput} ref={telRef} />
      <div className="d-grid gap-3">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={handleCreate}>
          추가
        </button>
      </div>
    </>
  )
}

export default ContactWrite3