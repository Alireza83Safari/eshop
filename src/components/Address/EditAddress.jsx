import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import instance from "../../api/userInterceptors";

export default function EditAddress({
  showEditAddress,
  setShowEditAddress,
  editAddressId,
  fetchAddress,
}) {
  const [addressError, setAddressError] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const { datas: addressData } = useFetch(
    `/api/v1/user/address/${editAddressId}`
  );

  const EditHandler = async (data) => {
    const addressData = {
      address: data.address,
      firstName: data.firstName,
      lastName: data.lastName,
      nationalCode: data.nationalCode,
      phoneNumber: data.phoneNumber,
      plaque: Number(data.plaque),
      postalCode: data.postalCode,
    };

    try {
      const res = await instance.post(
        `/api/v1/user/address/edit/${editAddressId}`,
        addressData
      );

      if (res.status === 200) {
        reset();
        setShowEditAddress(false);
        fetchAddress();
      }
    } catch (err) {
      console.log(err?.response.status);
      
      setAddressError(err?.response.data.errors);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showEditAddress ? "visible" : "invisible"
      }`}
    >
      <div className="w-2/4 bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Address
        </span>

        <form onSubmit={handleSubmit(EditHandler)}>
          <div className="grid grid-cols-2 gap-2 ">
            <div>
              <span className="font-medium text-gray-800">firstName</span>
              <input
                type="text"
                placeholder="firstName"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                {...register("firstName", {
                  required: "This field is required",
                  maxLength: {
                    value: 30,
                    message: "name cannot exceed 30 characters",
                  },
                })}
                defaultValue={addressData?.firstName}
                autoFocus={false}
              />

              <span className="text-red-700">{addressError?.firstName}</span>
            </div>

            <div>
              <span className="font-medium text-gray-800">lastName</span>
              <input
                type="text"
                placeholder="lastName"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                {...register("lastName", {
                  required: "This field is required",
                  maxLength: {
                    value: 30,
                    message: "name cannot exceed 30 characters",
                  },
                })}
                defaultValue={addressData?.lastName}
                autoFocus={false}
              />

              <span className="text-red-700">{addressError?.lastName}</span>
            </div>

            <div>
              <span className="font-medium text-gray-800">nationalCode</span>
              <input
                type="text"
                placeholder="nationalCode"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                {...register("nationalCode", {
                  required: "This field is required",
                  maxLength: {
                    value: 30,
                    message: "National code cannot exceed 30 characters",
                  },
                })}
                defaultValue={addressData?.nationalCode}
                autoFocus={false}
              />

              <span className="text-red-700">{addressError?.nationalCode}</span>
            </div>

            <div>
              <span className="font-medium text-gray-800">plaque</span>
              <input
                type="number"
                placeholder="plaque"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                {...register("plaque", {
                  required: "This field is required",
                  maxLength: {
                    value: 30,
                    message: "name cannot exceed 30 characters",
                  },
                })}
                defaultValue={addressData?.plaque}
              />

              <span className="text-red-700">{addressError?.plaque}</span>
            </div>

            <div>
              <span className="font-medium text-gray-800">phoneNumber</span>
              <input
                type="text"
                placeholder="phoneNumber"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                {...register("phoneNumber", {
                  required: "This field is required",
                  pattern: {
                    value: /^(\+98|0)?9\d{9}$/,
                    message: "Invalid phone number",
                  },
                  maxLength: {
                    value: 30,
                    message: "Phone number cannot exceed 30 characters",
                  },
                })}
                defaultValue={addressData?.phoneNumber}
              />

              <span className="text-red-700">{addressError?.phoneNumber}</span>
            </div>

            <div>
              <span className="font-medium text-gray-800">postalCode</span>
              <input
                type="text"
                placeholder="postalCode"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                {...register("postalCode", {
                  required: "This field is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid postal code",
                  },
                  maxLength: {
                    value: 30,
                    message: "Postal code cannot exceed 30 characters",
                  },
                })}
                defaultValue={addressData?.postalCode}
              />

              <span className="text-red-700">{addressError?.postalCode}</span>
            </div>

            <div className="col-span-2">
              <span className="font-medium text-gray-800">address</span>

              <textarea
                rows="3"
                placeholder="address"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                {...register("address", {
                  required: "This field is required",
                  maxLength: {
                    value: 100,
                    message: "name cannot exceed 30 characters",
                  },
                })}
                defaultValue={addressData?.address}
              ></textarea>

              <span className="text-red-700">{addressError?.address}</span>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 disabled:bg-gray-100"
            >
              Edit Product
            </button>

            <button
              type="submit"
              className="w-full py-2 rounded-xl border border-blue-600 ml-2"
              onClick={() => setShowEditAddress(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
