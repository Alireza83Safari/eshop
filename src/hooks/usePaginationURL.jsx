import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePaginationURL = (currentPage, pageSize) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchSearchResults = () => {
      searchParams.set("page", currentPage?.toString());
      searchParams.set("limit", pageSize?.toString());
      navigate(`?${searchParams.toString()}`);
      setLoading(false);
    };
    fetchSearchResults();
  }, [currentPage, pageSize]);

  return { isLoading };
};
