import { createContext, useState } from "react";
import useAddresses from "../api/address/user/useAddresses";

export const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAllAddress, setShowAllAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const { addresses, addressesLoading } = useAddresses();
 
  return (
    <AddressContext.Provider
      value={{
        showAddAddress,
        setShowAddAddress,
        setEditAddressId,
        showAllAddress,
        setShowAllAddress,
        addresses,
        editAddressId,
        setShowEditAddress,
        showEditAddress,
        addressesLoading,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
export default AddressContext;
