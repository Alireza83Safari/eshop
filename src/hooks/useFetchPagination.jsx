import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFetchPagination = (url, customAxios) => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const [paginations, setPaginations] = useState([]);
  const [total, setTotal] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");
  const order = searchParams.get("order");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const fetchData = () => {
    let URL = `${url}${location.search}`;
    if (categoryId) URL += `&categoryId=${categoryId}`;
    if (brandId) URL += `&brandId=${brandId}`;
    if (order) URL += `&order=${order}`;
    if (minPrice) URL += `&minPrice=${minPrice}`;
    if (maxPrice) URL += `&maxPrice=${maxPrice}`;

    setLoading(true);
    setTimeout(() => {
      customAxios
        .get(URL)
        .then((res) => {
          setLoading(false);
          setPaginations(res?.data?.data);
          setTotal(res?.data?.total);
        })
        .catch((err) => setLoading(err));
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, [location.search, categoryId, brandId, order, minPrice, maxPrice]);

  return { isLoading, paginations, total, fetchData };
};
