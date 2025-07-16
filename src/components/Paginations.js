import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Paginations.module.css';
import { Pagination } from 'react-bootstrap';

const Paginations = ({pageno, totalcount, pagesize, blocksize}) => {
  const [pages, setPages] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const countOfPage = Math.floor((totalcount-1)/pagesize + 1);
    const prev = Math.floor((pageno-1)/blocksize) * blocksize;
    const start = prev + 1;
    let end = prev + blocksize;
    let next = end + 1;
    if(end>=countOfPage) {
      end = countOfPage;
      next = 0;
    }
    const pageItem=[];
    for(let i=start; i<=end; i++)
      pageItem.push(i);
    setPages({prev, pageItem, next});
  }, []);

  const move=(pageno)=>navigate(`/?pageno=${pageno}`);

  if(pages===null)
    return;
  return (
    <Pagination className={styles.paginations}>
      {
        pages.prev>0 && <Pagination.Item onClick={()=>move(pages.prev)}>이전으로</Pagination.Item>
      }
      {
        pages.pageItem.map(i=><Pagination.Item key={i} active={pageno===i} onClick={()=>move(i)}>{i}</Pagination.Item>)
      }
      {
        pages.next>0 && <Pagination.Item onClick={()=>move(pages.next)}>다음으로</Pagination.Item>
      }
    </Pagination>
  )
}

export default Paginations;