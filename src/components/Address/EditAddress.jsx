import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import userAxios from "../../services/Axios/userInterceptors";
import FormSpinner from "../FormSpinner/FormSpinner";
import AddressContext from "../../context/AddressContext";
import addressSchema from "../../validations/address";

export default function EditAddress({}) {
  const { showEditAddress, setShowEditAddress, editAddressId, fetchAddress } =
    useContext(AddressContext);
  const [errors, setErrors] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [addressInfos, setAddressInfos] = useState({
    address: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    plaque: "",
    postalCode: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await userAxios.get(`/address/${editAddressId}`);
        setAddressInfos({ ...response?.data });

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (editAddressId) {
      fetchData();
    }
  }, [showEditAddress]);

  const setAddressHandler = (event) => {
    const { name, value } = event.target;
    setAddressInfos({
      ...addressInfos,
      [name]: value,
    });
  };

  const getFormValidation = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const isValid = await addressSchema.validate(addressInfos, {
        abortEarly: false,
      });
      setFormIsValid(isValid);
      setLoading(false);
    } catch (error) {
      let errors = error.inner.reduce(
        (acc, error) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setLoading(false);
      setErrors(errors);
    }
  };

  const EditHandler = async () => {
    try {
      const res = await userAxios.post(`/address/edit/${editAddressId}`, {
        ...addressInfos,
        plaque: Number(addressInfos?.plaque),
      });
      if (res.status === 200) {
        setShowEditAddress(false);
        fetchAddress();
      }
    } catch (err) {
      setServerErrors(err?.response?.data);
    }
  };

  useEffect(() => {
    if (formIsValid) {
      EditHandler();
    }
  }, [formIsValid]);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showEditAddress ? "visible" : "invisible"
      }`}
    >
      <div className="md:w-2/4 w-10/12 bg-white-100 dark:text-white-100 dark:bg-black-200 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Address
        </span>

        <form onSubmit={(e) => e.preventDefault()}>
          <div
            className={` grid grid-cols-2 gap-2 ${isLoading && "opacity-20"} `}
          >
            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                firstName
              </span>
              <input
                type="text"
                name="firstName"
                placeholder="firstName"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                onChange={setAddressHandler}
                value={addressInfos?.firstName}
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
                onChange={setAddressHandler}
                name="lastName"
                value={addressInfos?.lastName}
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
                type="text"
                name="nationalCode"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                placeholder="nationalCode"
                onChange={setAddressHandler}
                value={addressInfos?.nationalCode}
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
                name="plaque"
                placeholder="plaque"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                onChange={setAddressHandler}
                value={addressInfos?.plaque}
              />

              <span className="text-xs text-red-700">
                {errors?.plaque} {serverErrors?.errors?.plaque}
              </span>
            </div>

            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                phoneNumber
              </span>
              <input
                type="text"
                name="phoneNumber"
                placeholder="phoneNumber"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                onChange={setAddressHandler}
                value={addressInfos?.phoneNumber}
              />

              <span className="text-xs text-red-700">
                {errors?.phoneNumber} {serverErrors?.errors?.phoneNumber}
              </span>
            </div>

            <div>
              <span className="font-medium text-gray-800 dark:text-white-100">
                postalCode
              </span>
              <input
                type="text"
                name="postalCode"
                placeholder="postalCode"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
                onChange={setAddressHandler}
                value={addressInfos?.postalCode}
              />

              <span className="text-xs text-red-700">
                {errors?.postalCode} {serverErrors?.errors?.postalCode}
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
              {isLoading ? <FormSpinner /> : "Edit Product"}
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
