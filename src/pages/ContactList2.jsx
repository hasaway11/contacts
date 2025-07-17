import { Link, useSearchParams } from "react-router-dom"
import { readAll } from "../utils/api";
import { Alert } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginations from "../components/Paginations";
import useFetch from "../hooks/useFetch";

function Contact({contact}) {
  return (
    <tr>
      <td>{contact.no}</td>
      <td>
        <Link to={`/read?no=${contact.no}`}>{contact.name}</Link>
      </td>
      <td>{contact.address}</td>
      <td>{contact.tel}</td>
    </tr>
  )
}

function ContactList2() {
  const [searchParams] = useSearchParams();
  const pagenoInput = searchParams.get('pageno');
  const pageno = isNaN(parseInt(pagenoInput))? 1 : parseInt(pagenoInput);
  const PAGE_SIZE = 10;
  const BLOCK_SIZE = 5;

  // 커스텀훅을 이용한 데이터 패칭
  const {data, error, isLoading} = useFetch(()=>readAll(pageno));

  if(!data) return;
  if(isLoading) return <LoadingSpinner />
  if(error) return <Alert variant="danger">{error}</Alert>

  const {contacts, totalcount} = data;

  return (
    <>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>번호</th><th>이름</th><th>주소</th><th>연락처</th>
          </tr>
        </thead>
        <tbody>
        {
          contacts.map((contact,idx)=><Contact key={idx} contact={contact} />)
        }
        </tbody>
      </table>
      <Paginations pageno={pageno} pagesize={PAGE_SIZE} totalcount={totalcount} blocksize={BLOCK_SIZE} />
    </>
  )
}

export default ContactList2