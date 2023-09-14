import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faAngleRight,
  faEnvelope,
  faLocation,
  faPhone,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import userAxios from "../../services/Axios/userInterceptors";
import { ToastContainer, toast } from "react-toastify";
import EditAddress from "../Address/EditAddress";
import AddNewAddress from "../Address/AddNewAddress";
import Spinner from "../Spinner/Spinner";

export default function ProfileAddress() {
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(null);

  const {
    datas: userAddress,
    fetchData: fetchAddress,
    isLoading,
  } = useFetch("/address", userAxios);

  const deleteAddressHandler = (id) => {
    userAxios.post(`/address/delete/${id}`).then((res) => {
      fetchAddress();
      toast.success(`delete is successfuly`, {
        position: "bottom-right",
      });
    });
  };
  return (
    <div className="bg-white-100 dark:bg-black-800 dark:text-white-100 rounded-xl overflow-auto relative">
      <div className="flex justify-between items-center py-5 border-b px-3 w-full sticky top-0 rounded-t-lg">
        <p className="font-bold md:text-lg border-b-2 border-blue-600 pb-2">
          Address
        </p>
        <div
          className="border border-blue-600 text-blue-600 font-black md:px-4 px-2 md:py-2 py-1 rounded-lg"
          onClick={() => setShowAddAddress(true)}
        >
          <button className="md:text-base text-sm">Add New Address</button>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : userAddress?.length ? (
        userAddress?.map((address, index) => (
          <div className="border-b p-5" key={index}>
            <div className="flex items-center justify-between mb-3 px-3">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocation} className="mr-2" />
                <p className="md:text-base text-sm">{address.address}</p>
              </div>
              <button onClick={() => deleteAddressHandler(address.id)}>
                <FontAwesomeIcon icon={faTrashAlt} className="text-red-700" />
              </button>
            </div>
            <div className="md:px-10 sm:px-4 px-3 grid grid-cols-2">
              <div className="flex my-3 items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <p className="text-gray-800 mr-2 md:text-sm text-xs">
                  {address.firstName} {address.lastName}
                </p>
              </div>
              <div className="flex my-3 items-center md:justify-start justify-end">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <p className="text-gray-800 mr-4 md:text-sm text-xs">
                  {address.phoneNumber}
                </p>
              </div>
              <div className="flex my-3 items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <p className="text-gray-800 mr-4  md:text-sm text-xs">
                  {address.postalCode}
                </p>
              </div>
              <div className="flex my-3 items-center md:justify-start justify-end">
                <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
                <p className="text-gray-800 mr-4  md:text-sm text-xs">
                  {address.nationalCode}
                </p>
              </div>
              <div className="flex justify-between mt-3">
                <button
                  className="text-sm text-orange-400 font-bold"
                  onClick={() => {
                    setShowEditAddress(true);
                    setEditAddressId(address.id);
                  }}
                >
                  Edit Address
                  <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-center py-24">
          <img src="/images/address.svg" className="m-auto " />
          <p className="text-lg font-semibold">You havent address</p>
        </div>
      )}

      {showEditAddress && (
        <EditAddress
          showEditAddress={showEditAddress}
          setShowEditAddress={setShowEditAddress}
          editAddressId={editAddressId}
          fetchAddress={fetchAddress}
        />
      )}
      {showAddAddress && (
        <AddNewAddress
          showAddAddress={showAddAddress}
          setShowAddAddress={setShowAddAddress}
          fetchAddress={fetchAddress}
        />
      )}
      <ToastContainer />
    </div>
  );
}
