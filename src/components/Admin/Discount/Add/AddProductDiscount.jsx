import React, { useContext, useState } from "react";
import { discountValidation } from "../../../../validators/discountValidation";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";
import { useChangeDate } from "../../../../hooks/useChangeDate";
import { DiscountContext } from "../../../../Context/discountContext";
import { CustomSelect } from "../../../SelectList";
import useFetch from "../../../../hooks/useFetch";
import userAxios from "../../../../services/Axios/userInterceptors";
import Input from "../../Input";

export default function AddProductDiscount({
  setShowProductDiscount,
  setShowSelectDiscount,
}) {
  const { fetchData } = useContext(DiscountContext);
  const [infos, setInfos] = useState({
    expiresIn: "",
    quantity: "",
    productItemId: "",
    type: "",
    value: "",
  });
  const { formattedDate } = useChangeDate(infos?.expiresIn);
  const [errors, setErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { datas: products } = useFetch("/product", userAxios);

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
        setShowProductDiscount(false);
        toast.success("create discount is success");
      }
    } catch (error) {
      setServerErrors(error?.response?.data);
      setIsLoading(false);
    }
  };

  return (
    <>
      <span className="my-3 font-bold flex justify-center sm:text-xl text-[16px]">
        Add Product Discount
      </span>
      <p className="text-red-700 text-xs text-center">
        {serverErrors?.message}
      </p>
      <form
        className="w-full mx-auto bg-white rounded-lg relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          className={` grid grid-cols-2 gap-y-4 2xl:gap-y-10 text-sm ${
            isLoading && "opacity-20"
          } `}
        >
          <div className="col-span-2">
            <label
              htmlFor="productItemId"
              className="block text-gray-800 dark:text-white-100 font-medium text-xs"
            >
              Product
            </label>

            <CustomSelect
              options={products?.data.map((product) => ({
                value: product.itemId,
                label: product.name,
              }))}
              onchange={(selectedOptions) => {
                setInfos({
                  ...infos,
                  productItemId: selectedOptions?.value,
                });
                setErrors("");
              }}
            />

            <p className="text-red-700 text-xs">
              {errors?.productItemId} {serverErrors?.errors?.productItemId}
            </p>
          </div>

          <div className="col-span-2">
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

          <div className="col-span-2">
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

          <div className="mr-2">
            <label
              htmlFor="type"
              className="block text-gray-800 dark:text-white-100 font-medium text-xs"
            >
              discount type
            </label>
            <CustomSelect
              options={["price", "percent"].map((type) => ({
                value: type,
                label: type,
              }))}
              onchange={(selectedOptions) => {
                setInfos({
                  ...infos,
                  type: selectedOptions?.value === "price" ? 0 : 1,
                });
                setErrors("");
              }}
            />
            <p className="text-red-700 text-xs">
              {errors?.type}
              {serverErrors?.errors?.type}
            </p>
          </div>

          <div className="ml-2">
            <label
              htmlFor="expiresIn"
              className="block text-gray-800 dark:text-white-100 font-medium text-xs"
            >
              expiresIn
            </label>
            <input
              type="date"
              id="expiresIn"
              name="expiresIn"
              placeholder="expiresIn"
              className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
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
        </div>

        <div className="flex justify-center mt-7 2xl:mt-12">
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
              setShowProductDiscount(false);
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
