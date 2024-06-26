import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faAngleRight,
  faEnvelope,
  faLocation,
  faLocationPin,
  faPhone,
  faTrashAlt,
  faUser,
  faMultiply,
} from "@fortawesome/free-solid-svg-icons";
import AddressContext from "../../context/AddressContext";
import useDeleteAddress from "../../api/address/user/useDeleteAddress";

export default function AllAddress() {
  const {
    showAllAddress,
    setShowAddAddress,
    setShowAllAddress,
    setShowEditAddress,
    setEditAddressId,
    userAddress,
  } = useContext(AddressContext);

  const { deleteAddress } = useDeleteAddress();

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 h-screen -translate-y-1/2 z-10 w-full flex items-center justify-center transition duration-400 ${
        showAllAddress ? "visible" : "invisible"
      }`}
    >
      <div className="md:w-2/4 sm:w-10/12 w-11/12 bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-lg overflow-auto h-[30rem] relative">
        <div className="flex justify-between py-3 border-b px-3 w-full sticky top-0 rounded-t-lg">
          <p className="font-bold">Choose Address</p>
          <FontAwesomeIcon
            icon={faMultiply}
            onClick={() => setShowAllAddress(false)}
            className="text-2xl pr-"
          />
        </div>
        <div className="flex justify-between border-b p-5">
          <button
            className="flex items-center"
            onClick={() => {
              setShowAddAddress(true);
              setShowAllAddress(false);
            }}
          >
            <p className="font-semibold">Add New Address</p>
            <FontAwesomeIcon icon={faLocationPin} className="ml-2" />
          </button>
          <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
        </div>
        {userAddress?.map((address) => (
          <div className="border-b p-5" key={address.id}>
            <div className="flex items-center justify-between mb-3 px-3">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocation} className="mr-2" />
                <p>{address.address}</p>
              </div>
              <button onClick={() => deleteAddress(address.id)}>
                <FontAwesomeIcon icon={faTrashAlt} className="text-red-700" />
              </button>
            </div>
            <div className="px-10 mt-4">
              <div className="flex mb-3 items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <p className="text-gray-800 text-sm mr-2">
                  {address.firstName}
                </p>
                <p className="text-gray-800 text-sm">{address.lastName}</p>
              </div>

              <div className="flex mb-3 items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <p className="text-gray-800 mr-4 text-sm">
                  {address.phoneNumber}
                </p>
              </div>
              <div className="flex mb-3 items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <p className="text-gray-800 mr-4 text-sm">
                  {address.postalCode}
                </p>
              </div>
              <div className="flex mb-3 items-center">
                <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
                <p className="text-gray-800 mr-4 text-sm">
                  {address.nationalCode}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="text-sm text-orange-400 font-bold"
                  onClick={() => {
                    setShowEditAddress(true);
                    setShowAllAddress(false);
                    setEditAddressId(address?.id);
                  }}
                >
                  Edit Address
                  <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
