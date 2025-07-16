import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { createPhoto, read, update } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Alert } from 'react-bootstrap';
import useProfile from '../hooks/useProfile';
import useInput from '../hooks/useInput';
import ProfileField from '../components/ProfileField';
import InputField from '../components/InputField';
import { AsyncStatus } from '../utils/constants';

function ContactUpdate() {
  const [searchParams] = useSearchParams();
  const no = searchParams.get('no');

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(undefined);
  const [status, setStatus] = useState(AsyncStatus.IDLE);

  const nameInput = useInput();
  const telInput = useInput();
  const addressInput = useInput();
  const profileInput = useProfile();

  useEffect(()=>{
    setLoading(true);
    async function fetch() {
      try {
        const response = await read(no);
        const {name, address, tel, photo} = response.data;
        nameInput.setValue(name);
        addressInput.setValue(address);
        telInput.setValue(tel);
        profileInput.setPreviewUrl(photo);
      } catch(err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [no]);

  const handleUpdate=async()=>{
    if(status === AsyncStatus.SUBMITTING) return;
    setStatus(AsyncStatus.SUBMITTING);

    const r1 = nameInput.check();
    const r2 = telInput.check();
    const r3 = addressInput.check();
    
    if (!(r1&&r2&&r3)) 
      return;
    
    try {
      const obj = { name: nameInput.value, address: addressInput.value, tel: telInput.value };
      await update(obj, no);
    
      if (profileInput.profile) {
        const formData = new FormData();
        formData.append('photo', profileInput.profile);
        await createPhoto(formData, no);
      }
    } catch (error) {
      setStatus(AsyncStatus.FAIL);
      setError(error.message);
    } finally {
      setStatus(AsyncStatus.IDLE);
    }
  }


  if(no===null) return <Navigate to="/" />
  if(isLoading===undefined || isLoading===true) return <LoadingSpinner />
  if(error) return <Alert variant="danger">{error}</Alert>

  if(status===AsyncStatus.SUBMITTING) return <LoadingSpinner />

  return (
    <>
      {status===AsyncStatus.FAIL && <Alert variant='danger'>{error}</Alert>}
      <table className='table table-border'>
        <tbody>
          <tr>
            <td>
              <ProfileField label="사진" name="photo" type="file" {...profileInput} />
            </td>
          </tr>
          <tr>
            <td><InputField label="이름" name="name" {...nameInput} /></td>
          </tr>
          <tr>
            <td><InputField label="주소" name="address" {...addressInput} /></td>
          </tr>
          <tr>
            <td><InputField label="연락처" name="tel" {...telInput} /></td>
          </tr>
        </tbody>
      </table>
      <div className="d-grid gap-3">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={handleUpdate}>
          변경
        </button>
      </div>
    </>
  )
}

export default ContactUpdate