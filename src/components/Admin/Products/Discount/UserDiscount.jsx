import React, { useContext, useEffect, useState } from "react";
import { discountValidation } from "../../../../validators/discountValidation";
import UserTable from "./UserTable";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import Spinner from "../../../Spinner/Spinner";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";

export default function UserDiscount({ setShowUserDiscount }) {
  const { setShowDiscount } = useContext(ProductsPanelContext);
  const [errors, setErrors] = useState();
  const [serverErrors, setServerErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [showChooseUser, setShowChooseUser] = useState(false);
  const [infos, setInfos] = useState({
    code: "",
    expiresIn: "",
    quantity: "",
    relatedUserId: "",
    type: "",
    value: "",
    productItemId: null,
  });
  useEffect(() => {
    if (userId?.length > 1) {
      setShowChooseUser(false);
    }
  }, [userId]);

  const addUserDiscount = async () => {
    const userInfos = {
      code: infos?.code,
      expiresIn: infos?.expiresIn,
      quantity: Number(infos?.quantity),
      relatedUserId: userId,
      type: Number(infos?.type),
      value: Number(infos?.value),
    };

    discountValidation(infos, errors, setErrors);
    setIsLoading(true);
    try {
      const response = await adminAxios.post(`/discount`, userInfos);
      setIsLoading(false);
      if (response.status === 200) {
        setShowDiscount(false);
        setShowUserDiscount(false);
      }
    } catch (error) {
      setServerErrors(error?.response?.data);
      setIsLoading(false);
    }
  };

  const setInfoss = (event) => {
    setInfos({
      ...infos,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="w-1/3  bg-white-100 p-5 rounded-xl ">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add User Discount
        </span>
        <p className="text-red-700 text-xs text-center">
          {serverErrors?.message}
        </p>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="relatedUserId"
                  className="block text-gray-800 font-medium"
                >
                  User
                </label>

                <button
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 text-start"
                  onClick={() => setShowChooseUser(true)}
                >
                  {!username ? "click for choose" : `${username}`}
                </button>
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-gray-800 font-medium"
                >
                  discount type
                </label>
                <select
                  name="type"
                  id="type"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setInfoss}
                  value={infos?.type}
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="1">%</option>
                  <option value="2">$</option>
                </select>
                <p className="text-red-700 text-xs">
                  {errors?.type} {serverErrors?.errors?.type}
                </p>
              </div>

              <div>
                <label
                  htmlFor="value"
                  className="block text-gray-800 font-medium"
                >
                  discount value
                </label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  placeholder="value"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setInfoss}
                  value={infos?.value}
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />

                <p className="text-red-700 text-xs">
                  {errors?.value}
                  {serverErrors?.errors?.value}
                </p>
              </div>

              <div>
                <label
                  htmlFor="expiresIn"
                  className="block text-gray-800 font-medium"
                >
                  expiresIn
                </label>
                <input
                  type="text"
                  id="expiresIn"
                  name="expiresIn"
                  placeholder="expiresIn"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setInfoss}
                  value={infos?.expiresIn}
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />

                <p className="text-red-700 text-xs">
                  {errors?.expiresIn}
                  {serverErrors?.errors?.expiresIn}
                </p>
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-gray-800 font-medium"
                >
                  quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="quantity"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setInfoss}
                  value={infos?.quantity}
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />

                <p className="text-red-700 text-xs">
                  {errors?.quantity}
                  {serverErrors?.errors?.quantity}
                </p>
              </div>

              <div>
                <label
                  htmlFor="code"
                  className="block text-gray-800 font-medium"
                >
                  code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="code"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setInfoss}
                  value={infos?.code}
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />

                <p className="text-red-700 text-xs">
                  {errors?.code}
                  {serverErrors?.errors?.code}
                </p>
              </div>
            </div>
            {showChooseUser && (
              <UserTable setUserId={setUserId} setUsername={setUsername} />
            )}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
                onClick={addUserDiscount}
              >
                Add Discount
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
