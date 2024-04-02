import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useFetchPagination = (url, customAxios) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [isLoading, setLoading] = useState(true);
  const [paginations, setPaginations] = useState([]);
  const [total, setTotal] = useState(null);
  const page = searchParams.get("page") || "";

  const fetchData = useCallback(async () => {
    setLoading(true);
    let URL = `${url}${location.search}`;
    setLoading(false);
    try {
      if (page) {
        setLoading(true);
        const res = await customAxios.get(URL);
        setPaginations(res?.data?.data);
        setTotal(res?.data?.total);
        setLoading(false);
      }
    } catch (err) {
      setLoading(err);
    }
  }, [location.search]);

  useEffect(() => {
    fetchData();
  }, [location.search]);

  return {
    isLoading,
    paginations,
    total,
    fetchData,
  };
};
