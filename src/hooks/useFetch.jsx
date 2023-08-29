import { useState, useEffect } from "react";

const useFetch = (url, customInstance) => {
  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await customInstance.get(url);
      setDatas(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, customInstance]);

  return { datas, isLoading, error, fetchData };
};

export default useFetch;
