import { useState, useEffect } from "react";
import instance from "../api/userInterceptors";

const useFetch = (url) => {
  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await instance.get(url);
      setDatas(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { datas, isLoading, error, fetchData };
};

export default useFetch;
