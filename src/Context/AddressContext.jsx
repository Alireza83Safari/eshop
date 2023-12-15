import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import userAxios from "../services/Axios/userInterceptors";

export const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAllAddress, setShowAllAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const {
    datas: userAddress,
    fetchData: fetchAddress,
    isLoading,
  } = useFetch("/address", userAxios);
  return (
    <AddressContext.Provider
      value={{
        showAddAddress,
        setShowAddAddress,
        setEditAddressId,
        showAllAddress,
        setShowAllAddress,
        fetchAddress,
        userAddress,
        editAddressId,
        setShowEditAddress,
        showEditAddress,
        isLoading,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
export default AddressContext;
