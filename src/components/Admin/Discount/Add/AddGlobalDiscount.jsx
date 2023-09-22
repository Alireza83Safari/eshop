import React, { useContext, useState } from "react";
import { discountValidation } from "../../../../validators/discountValidation";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";
import { useChangeDate } from "../../../../hooks/useChangeDate";
import discountContext from "../../../../Context/discountContext";
import { CustomSelect } from "../../../SelectList";
import Input from "../../Input";

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
      <span className="my-3 font-bold flex justify-center sm:text-xl text-[16px]">
        Add Global Discount
      </span>
      <p className="text-red-700 text-xs text-center">
        {serverErrors?.message}
      </p>
      <form
        className="w-full mx-auto bg-white rounded-lg relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          className={` grid grid-cols-1 gap-3 text-sm 2xl:gap-y-8 ${
            isLoading && "opacity-20"
          } `}
        >
          <div>
            <label htmlFor="type" className="block text-gray-800 font-medium">
              discount type
            </label>
            <CustomSelect
              options={[1, 2].map((type) => ({
                value: type,
                label: type,
              }))}
              onchange={(selectedOptions) => {
                setInfos({
                  ...infos,
                  type: selectedOptions?.value,
                });
                setErrors("");
              }}
            />
            <p className="text-red-700 text-xs">
              {errors?.type}
              {serverErrors?.errors?.type}
            </p>
          </div>

          <div>
            <Input
              type="number"
              labelText="value"
              placeholder="value"
              name="value"
              value={infos?.value}
              onChange={setInfoss}
              Error={errors?.value || serverErrors?.errors?.value}
              callback={() => setServerErrors("")}
            />
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
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
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
            <Input
              type="number"
              labelText="quantity"
              placeholder="quantity"
              name="quantity"
              value={infos?.quantity}
              onChange={setInfoss}
              Error={errors?.quantity || serverErrors?.errors?.quantity}
              callback={() => setServerErrors("")}
            />
          </div>
        </div>
        <div className="flex justify-center sm:mt-4 mt-5 2xl:mt-10">
          <button
            type="submit"
            className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 sm:text-base text-sm"
            onClick={addProductDiscount}
          >
            {isLoading ? <FormSpinner /> : "Add Discount"}
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-xl ml-2 border border-blue-600 sm:text-base text-sm"
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
