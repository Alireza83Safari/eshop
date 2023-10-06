import { createContext } from "react";
import { useFetchPagination } from "../hooks/useFetchPagination";
import adminAxios from "../services/Axios/adminInterceptors";

export const DiscountContext = createContext();

export const DiscountContextProvider = ({ children }) => {
  let url = "/discount";
  const {
    isLoading: paginatedProductsLoading,
    fetchData,
    paginations,
    total,
  } = useFetchPagination(url, adminAxios);
  return (
    <DiscountContext.Provider
      value={{ paginations, fetchData, paginatedProductsLoading, total }}
    >
      {children}
    </DiscountContext.Provider>
  );
};
