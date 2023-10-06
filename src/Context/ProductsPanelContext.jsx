import { createContext, useState } from "react";
import { useFetchPagination } from "../hooks/useFetchPagination";
import adminAxios from "../services/Axios/adminInterceptors";

const ProductsPanelContext = createContext();

export const ProductsPanelContextProvider = ({ children }) => {
  const [productDeleteId, setProductDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [newProductId, setNewProductId] = useState(null);
  const [editProductID, setEditProductID] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  let url = "product";
  const {
    paginations,
    total,
    isLoading: paginationLoading,
    fetchData: fetchProductList,
  } = useFetchPagination(url, adminAxios);
  return (
    <ProductsPanelContext.Provider
      value={{
        searchQuery,
        setProductDeleteId,
        setShowEditModal,
        showEditModal,
        setShowEditModal,
        showDeleteModal,
        setShowDeleteModal,
        productDeleteId,
        setNewProductId,
        newProductId,
        fetchProductList,
        showAddProductModal,
        setShowAddProductModal,
        setEditProductID,
        editProductID,
        paginations,
        total,
        paginationLoading,
        setSearchQuery
      }}
    >
      {children}
    </ProductsPanelContext.Provider>
  );
};

export default ProductsPanelContext;
