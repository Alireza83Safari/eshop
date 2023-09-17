import React, { useContext, useState } from "react";
import { discountValidation } from "../../../../validators/discountValidation";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";
import { useChangeDate } from "../../../../hooks/useChangeDate";
import discountContext from "../../../../Context/discountContext";

export default function AddGlobalDiscount({
  setShowGlobalDiscount,
  setShowSelectDiscount,
}) {
  const { fetchData } = useContext(discountContext);
  const [infos, setInfos] = useState({
    expiresIn: "",
    quantity: "",
    type: "",
    value: "",
  });
  const { formattedDate } = useChangeDate(infos?.expiresIn);
  const [errors, setErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const setInfoss = (event) => {
    const { name, value } = event.target;
    setInfos({
      ...infos,
      [name]: value,
    });
  };

  const addProductDiscount = async () => {
    discountValidation(infos, errors, setErrors);
    setIsLoading(true);
    try {
      const response = await adminAxios.post(`/discount`, {
        ...infos,
        expiresIn: formattedDate,
        quantity: Number(infos?.quantity),
        type: Number(infos?.type),
        value: Number(infos?.value),
      });
      setIsLoading(false);
      if (response.status === 200) {
        fetchData();
        setShowSelectDiscount(true);
        setShowGlobalDiscount(false);
        toast.success("create discount succesfuly");
      }
    } catch (error) {
      setServerErrors(error?.response?.data);
      setIsLoading(false);
    }
  };
  return (
    <>
      <span className="mb-5 text-xl font-bold flex justify-center">
        Add Global Discount
      </span>
      <p className="text-red-700 text-xs text-center">
        {serverErrors?.message}
      </p>
      <form
        className="w-full max-w-sm mx-auto px-4 bg-white rounded-lg relative text-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          className={` grid grid-cols-1 gap-3 ${
            isLoading && "opacity-20"
          } `}
        >
          <div>
            <label htmlFor="type" className="block text-gray-800 font-medium">
              discount type
            </label>
            <select
              name="type"
              id="type"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 text-sm"
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
              {errors?.type}
              {serverErrors?.errors?.type}
            </p>
          </div>

          <div>
            <label htmlFor="value" className="block text-gray-800 font-medium">
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
              type="date"
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
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
            onClick={addProductDiscount}
          >
            {isLoading ? <FormSpinner /> : "Add Discount"}
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-xl ml-2 border border-blue-600"
            onClick={() => {
              setShowGlobalDiscount(false);
              setShowSelectDiscount(true);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
