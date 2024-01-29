import React from "react";
import { AddressContextProvider } from "../../context/AddressContext";
import Address from "../Address/Address";
const ProfileAddress = () => {
  return (
    <div>
      <AddressContextProvider>
        <Address />
      </AddressContextProvider>
    </div>
  );
};

export default ProfileAddress;
