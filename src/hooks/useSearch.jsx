import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useSearch = (searchQuery) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const setSearchValue = (updatePage) => {
    searchHandler("searchTerm", searchQuery.toLowerCase(), updatePage);
  };

  const searchHandler = useCallback(
    (name, value, updatePage) => {
      searchParams.set(name, value);
      if (value === "") {
        searchParams.delete(name);
      }

      if (updatePage) {
        searchParams.set("page", "1");
      }

      navigate(`?${searchParams.toString()}`);
    },
    [searchParams, navigate]
  );

  return { setSearchValue };
};
