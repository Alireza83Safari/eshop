import React, { useState } from "react";
import ReactDOM from "react-dom";
import userAxios from "../../services/Axios/userInterceptors"
import { addressValidation } from "../../validators/addressValidation";
import { Spinner } from "flowbite-react";

export default function AddNewAddress({
  showAddAddress,
  setShowAddAddress,
  fetchAddress,
}) {
  const [errors, setErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setIsLoadnig] = useState(null);

  const [addressInfos, setAddressInfos] = useState({
    address: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    plaque: 0,
    postalCode: "",
  });

  const addNewAddress = () => {
    addressValidation(addressInfos, errors, setErrors);
    setIsLoadnig(true);

    userAxios
      .post("/address", addressInfos)
      .then((res) => {
        if (res.status === 200) {
          setShowAddAddress(false);
          fetchAddress();
          setIsLoadnig(false);
        }
      })

      .catch((err) => {
        setServerErrors(err?.response?.data);
        setIsLoadnig(false);
      });
  };

  const setAddressHandler = (event) => {
    setAddressInfos({
      ...addressInfos,
      [event.target.name]: event.target.value,
    });
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showAddAddress ? "visible" : "invisible"
      }`}
    >
      <div className="w-2/4 bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add New Address
        </span>

        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-2 ">
              <div>
                <span className="font-medium text-gray-800">firstName</span>
                <input
                  type="text"
                  placeholder="firstName"
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
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
                <span className="font-medium text-gray-800">lastName</span>
                <input
                  type="text"
                  placeholder="lastName"
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
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
                <span className="font-medium text-gray-800">nationalCode</span>
                <input
                  type="number"
                  placeholder="nationalCode"
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
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
                <span className="font-medium text-gray-800">plaque</span>
                <input
                  type="number"
                  placeholder="plaque"
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
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
                <span className="font-medium text-gray-800">phoneNumber</span>
                <input
                  type="number"
                  placeholder="phoneNumber"
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
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
                <span className="font-medium text-gray-800">postalCode</span>
                <input
                  type="number"
                  placeholder="postalCode"
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
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
                <span className="font-medium text-gray-800">address</span>

                <textarea
                  rows="3"
                  placeholder="address"
                  name="address"
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
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
                onClick={() => addNewAddress()}
              >
                Add Product
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
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
