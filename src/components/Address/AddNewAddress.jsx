import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FormSpinner from "../FormSpinner/FormSpinner";
import AddressContext from "../../context/AddressContext";
import addressSchema from "../../validations/address";
import useCreateAddress from "../../api/address/user/useCreateAddress";

export default function AddNewAddress() {
  const { createAddress, isSuccess, error } = useCreateAddress();
  const { showAddAddress, setShowAddAddress } = useContext(AddressContext);
  const [errors, setErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setIsLoadnig] = useState(false);

  const [addressInfos, setAddressInfos] = useState({
    address: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    plaque: 0,
    postalCode: "",
  });

  const getFormValidation = async (event) => {
    event.preventDefault();
    setIsLoadnig(true);

    try {
      const isValid = await addressSchema.validate(addressInfos, {
        abortEarly: false,
      });
      if (isValid) {
        createAddress({
          ...addressInfos,
          plaque: Number(addressInfos.plaque),
        });
      }
      setIsLoadnig(false);
    } catch (error) {
      let errors = error.inner.reduce(
        (acc, error) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setIsLoadnig(false);
      setErrors(errors);
    }
  };

  const setAddressHandler = (event) => {
    const { name, value, type } = event.target;
    setAddressInfos({
      ...addressInfos,
      [name]: type === "number" ? +value : value,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowAddAddress(false);
      setIsLoadnig(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setServerErrors(error?.response?.data);
      setIsLoadnig(false);
    }
  }, [error]);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform z-10 -translate-x-1/2 bg-gray-100 -translate-y-1/2 w-full h-screen overflow-auto flex items-center justify-center transition duration-400 ${
        showAddAddress ? "visible" : "invisible"
      }`}
    >
      <div className="md:w-2/4 sm:w-10/12 w-11/12 bg-white-100 dark:bg-black-200 p-5 rounded-xl dark:text-white-100 overflow-auto">
        <span
          className={` mb-5 text-xl font-bold flex justify-center ${
            isLoading && "opacity-20"
          }`}
        >
          Add New Address
        </span>

        <form onSubmit={(e) => e.preventDefault()}>
          <span className="text-xs flex justify-center text-center text-red-700">
            {serverErrors?.message}
          </span>

          <div
            className={` grid grid-cols-2 gap-2 min-h-[20rem] ${
              isLoading && "opacity-20"
            } `}
          >
            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                firstName
              </span>
              <input
                type="text"
                placeholder="firstName"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                name="firstName"
                onChange={setAddressHandler}
                value={addressInfos?.firstName}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <span className="text-xs text-red-700">
                {errors?.firstName} {serverErrors?.errors?.firstName}
              </span>
            </div>

            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                lastName
              </span>
              <input
                type="text"
                placeholder="lastName"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                name="lastName"
                onChange={setAddressHandler}
                value={addressInfos?.lastName}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />

              <span className="text-xs text-red-700">
                {errors?.lastName} {serverErrors?.errors?.lastName}
              </span>
            </div>

            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                nationalCode
              </span>
              <input
                placeholder="nationalCode"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                name="nationalCode"
                onChange={setAddressHandler}
                value={addressInfos?.nationalCode}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />

              <span className="text-xs text-red-700">
                {errors?.nationalCode} {serverErrors?.errors?.nationalCode}
              </span>
            </div>

            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                plaque
              </span>
              <input
                type="number"
                placeholder="plaque"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                name="plaque"
                onChange={setAddressHandler}
                value={addressInfos?.plaque}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />

              <span className="text-xs text-red-700">
                {errors?.plaque}
                {serverErrors?.errors?.plaque}
              </span>
            </div>

            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                phoneNumber
              </span>
              <input
                placeholder="phoneNumber"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                name="phoneNumber"
                onChange={setAddressHandler}
                value={addressInfos?.phoneNumber}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />

              <span className="text-xs text-red-700">
                {errors?.phoneNumber}
                {serverErrors?.errors?.phoneNumber}
              </span>
            </div>

            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                postalCode
              </span>
              <input
                placeholder="postalCode"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                name="postalCode"
                onChange={setAddressHandler}
                value={addressInfos?.postalCode}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />

              <span className="text-xs text-red-700">
                {errors?.postalCode}
                {serverErrors?.errors?.postalCode}
              </span>
            </div>

            <div className="col-span-2">
              <span className="font-medium text-gray-800 dark:text-white-100">
                address
              </span>

              <textarea
                rows="3"
                placeholder="address"
                name="address"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                onChange={setAddressHandler}
                value={addressInfos?.address}
              ></textarea>

              <span className="text-xs text-red-700">
                {errors?.address} {serverErrors?.errors?.address}
              </span>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 disabled:bg-gray-100"
              onClick={getFormValidation}
            >
              {isLoading ? <FormSpinner /> : "Add Product"}
            </button>

            <button
              type="submit"
              className="w-full py-2 rounded-xl border border-blue-600 ml-2"
              onClick={() => setShowAddAddress(false)}
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
