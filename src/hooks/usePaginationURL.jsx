import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePaginationURL = (currentPage, initialLimit) => {
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const searchParamsPage = searchParams.get("page");
  const searchParamsLimit = searchParams.get("limit");

  const page = currentPage ? currentPage : searchParamsPage;
  const limit = searchParamsLimit ? searchParamsLimit : initialLimit;

  const getPaginationUrl = useCallback(async () => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);

    if (page) {
      searchParams.set("page", String(page));
    }
    if (limit) {
      searchParams.set("limit", String(limit));
    }
    navigate(`?${searchParams.toString()}`);
    setLoading(false);
  }, [page, limit, location.search]);

  useEffect(() => {
    getPaginationUrl();
  }, [page, currentPage, location.search]);

  return { isLoading };
};
