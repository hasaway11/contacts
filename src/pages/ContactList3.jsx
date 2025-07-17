import { Link, useSearchParams } from "react-router-dom"
import { Alert } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginations from "../components/Paginations";
import useSWR from "swr";
import { readAll } from "../utils/api";

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

function ContactList3() {
  const [searchParams] = useSearchParams();
  const pagenoInput = searchParams.get('pageno');
  const pageno = isNaN(parseInt(pagenoInput))? 1 : parseInt(pagenoInput);
  const PAGE_SIZE = 10;
  const BLOCK_SIZE = 5;

  // swr을 이용한 데이터 fetching
  const {data, error, isLoading } = useSWR(['posts', pageno], ()=>readAll(pageno), { revalidateOnFocus: false, shouldRetryOnError: false} );

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

export default ContactList3