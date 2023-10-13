import React, { useContext, useState } from "react";
import { discountValidation } from "../../../../validators/discountValidation";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import Spinner from "../../../Spinner/Spinner";
import { useChangeDate } from "../../../../hooks/useChangeDate";
import { DiscountContext } from "../../../../Context/discountContext";
import { CustomSelect } from "../../../SelectList";
import useFetch from "../../../../hooks/useFetch";
import Input from "../../Input";
export default function AddUserDiscount({
  setShowUserDiscount,
  setShowSelectDiscount,
}) {
  const { fetchData } = useContext(DiscountContext);
  const [errors, setErrors] = useState();
  const [serverErrors, setServerErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [infos, setInfos] = useState({
    code: "",
    expiresIn: "",
    quantity: "",
    relatedUserId: "",
    type: "",
    value: "",
    productItemId: null,
  });

  const { formattedDate } = useChangeDate(infos?.expiresIn);

  const setInfoss = (event) => {
    const { name, value } = event.target;
    setInfos({
      ...infos,
      [name]: value,
    });
  };

  const addUserDiscount = async () => {
    discountValidation(infos, errors, setErrors);
    setIsLoading(true);

    try {
      const response = await adminAxios.post(`/discount`, {
        ...infos,
        expiresIn: formattedDate,
        quantity: Number(infos?.quantity),
        value: Number(infos?.value),
        type: Number(infos?.type),
      });
      setIsLoading(false);
      if (response.status === 200) {
        setShowSelectDiscount(true);
        setShowUserDiscount(false);
        fetchData();
      }
    } catch (error) {
      setServerErrors(error?.response?.data);
      setIsLoading(false);
    }
  };
  const { datas: users } = useFetch("/user", adminAxios);
  return (
    <>
      <span className="my-3 font-bold flex justify-center sm:text-xl text-[16px]">
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
          className="w-full mx-auto rounded-lg relative text-sm"
        >
          <div className="grid grid-cols-2 gap-4 sm:mt-4 2xl:gap-y-7 sm:text-base text-sm">
            <div className="col-span-2">
              <label
                htmlFor="relatedUserId"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
                User
              </label>
              <CustomSelect
                options={users?.data.map((type) => ({
                  value: type.id,
                  label: type.username,
                }))}
                onchange={(selectedOptions) => {
                  setInfos({
                    ...infos,
                    relatedUserId: selectedOptions?.value,
                  });
                  setErrors("");
                }}
              />
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

            <div>
              <label
                htmlFor="type"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
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
                {errors?.type} {serverErrors?.errors?.type}
              </p>
            </div>

            <div>
              <label
                htmlFor="expiresIn"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
                expiresIn
              </label>
              <input
                type="date"
                id="expiresIn"
                name="expiresIn"
                placeholder="expiresIn"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200 text-sm"
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

            <div>
              <Input
                labelText="code"
                placeholder="code"
                name="code"
                value={infos?.code}
                onChange={setInfoss}
                Error={errors?.code || serverErrors?.errors?.code}
                callback={() => setServerErrors("")}
              />
            </div>
          </div>

          <div className="flex justify-center sm:mt-8 mt-6 2xl:mt-10">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 sm:text-base text-sm"
              onClick={addUserDiscount}
            >
              Add Discount
            </button>

            <button
              type="submit"
              className="w-full py-2 rounded-xl ml-2 border border-blue-600 sm:text-base text-sm"
              onClick={() => {
                setShowUserDiscount(false);
                setShowSelectDiscount(true);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}
