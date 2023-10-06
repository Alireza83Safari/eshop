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

  const fetchSearchResults = useCallback(async () => {
    try {
      setLoading(true);
      searchParams.set("page", currentPage?.toString());
      searchParams.set("limit", pageSize?.toString());
      navigate(`?${searchParams.toString()}`);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [currentPage, pageSize, searchParams, navigate]);

  useEffect(() => {
    if (currentPage != null && pageSize != null) {
      fetchSearchResults();
    }
  }, [fetchSearchResults]);

  return { isLoading, error };
};
