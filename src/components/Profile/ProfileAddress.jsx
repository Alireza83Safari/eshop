import React from "react";
import { AddressContextProvider } from "../../context/AddressContext";
import Address from "../Address/Address";
const ProfileAddress = () => {
  return (
    <AddressContextProvider>
      <Address />
    </AddressContextProvider>
  );
};

export default ProfileAddress;
