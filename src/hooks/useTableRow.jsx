import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useTableRow = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [rowNumber, setRowNumber] = useState(1); // شماره ردیف
  let page = searchParams.get("page");
  let limit = searchParams.get("limit");
  useEffect(() => {
    setRowNumber(page <= 1 ? page : (page - 1) * limit);
  }, [page, limit]);
  return { rowNumber, limit };
};
export default useTableRow;
