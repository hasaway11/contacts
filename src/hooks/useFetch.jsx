import axios from "axios";
import { useEffect, useState } from "react";

// 간단한 데이터 fetching 커스텀 훅
function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fetcher) 
      return;
    setLoading(true);
    setError(null);
    fetcher().then((res) => { 
      setData(res.data)
  }).catch((err) => setError(err)).finally(() => setLoading(false));
  }, [fetcher]);

  return {data, loading, error};
}

export default useFetch;