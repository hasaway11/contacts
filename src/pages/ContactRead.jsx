import { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { read, remove } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

function ContactRead() {
  const [searchParams] = useSearchParams();
  const no = searchParams.get('no');
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    read(no).then(response=>setContact(response.data)).catch(err=>setError(err.message)).finally(setLoading(false));
  }, [no]);

  const removeContact=()=>remove(no).then(()=>navigate("/")).catch(err=>console.log(err));
  
  if(no===null) return <Navigate to="/" />
  if(!contact) return;
  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant="danger">{error}</Alert>

  return (
    <>
      <table className='table table-border'>
        <tbody>
          <tr>
            <td>
              <img src={contact.photo} style={{ height: '200px', objectFit: 'cover' }} alt='프로필 사진' />
            </td>
          </tr>
          <tr>
            <td>{contact.name}</td>
          </tr>
          <tr>
            <td>{contact.address}</td>
          </tr>
          <tr>
            <td>{contact.tel}</td>
          </tr>
        </tbody>
      </table>
      <Button variant='outline-primary' style={{marginRight:'20px'}} onClick={()=>navigate(`/update?no=${no}`)}>변경화면으로</Button>
      <Button variant='outline-danger' onClick={removeContact}>삭제</Button>
    </>
  )
}

export default ContactRead