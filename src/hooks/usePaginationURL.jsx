import { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePaginationURL = (currentPage, pageSize) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(pageSize);

  const fetchSearchResults = useCallback(async () => {
    try {
      setLoading(true);
      searchParams.set(
        "page",
        currentPage !== null ? currentPage?.toString() : "1"
      );
      searchParams.set("limit", limit !== null ? limit?.toString() : "12");
      navigate(`?${searchParams.toString()}`);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [currentPage, pageSize, searchParams, navigate]);
  useEffect(() => {
    const limitParam = searchParams.get("limit");
    if (limitParam) {
      setLimit(limitParam);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return { isLoading, error };
};
