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
import instance from "../../api/userInterceptors";
import { ToastContainer, toast } from "react-toastify";
import EditAddress from "../Address/EditAddress";
import AddNewAddress from "../Address/AddNewAddress";

export default function ProfileAddress() {
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(null);

  const { datas: userAddress, fetchData: fetchAddress } = useFetch(
    "/address",
    instance
  );

  const deleteAddressHandler = (id) => {
    instance.post(`/address/delete/${id}`).then((res) => {
      fetchAddress();
      toast.success(`delete is successfuly`, {
        position: "bottom-right",
      });
    });
  };
  return (
    <div className="bg-white-100 dark:bg-black-800 dark:text-white-100 rounded-xl overflow-auto relative">
      <div className="flex justify-between items-center py-5 border-b px-3 w-full sticky top-0 rounded-t-lg">
        <p className="font-bold text-lg border-b-2 border-blue-600 pb-2">
          Address
        </p>
        <div
          className="border border-blue-600 text-blue-600 font-black px-4 py-2 rounded-lg"
          onClick={() => setShowAddAddress(true)}
        >
          <button>Add New Address</button>
        </div>
      </div>

      {userAddress?.map((address) => (
        <div className="border-b p-5">
          <div className="flex items-center justify-between mb-3 px-3">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLocation} className="mr-2" />
              <p>{address.address}</p>
            </div>
            <button onClick={() => deleteAddressHandler(address.id)}>
              <FontAwesomeIcon icon={faTrashAlt} className="text-red-700" />
            </button>
          </div>
          <div className="px-10 grid grid-cols-2">
            <div className="flex my-3 items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <p className="text-gray-800 text-sm mr-2">{address.firstName}</p>
              <p className="text-gray-800 text-sm">{address.lastName}</p>
            </div>
            <div className="flex my-3 items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <p className="text-gray-800 mr-4 text-sm">
                {address.phoneNumber}
              </p>
            </div>
            <div className="flex my-3 items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <p className="text-gray-800 mr-4 text-sm">{address.postalCode}</p>
            </div>
            <div className="flex my-3 items-center">
              <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
              <p className="text-gray-800 mr-4 text-sm">
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
      ))}
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
