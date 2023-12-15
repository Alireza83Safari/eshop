import React, { useEffect, useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import ReactDOM from "react-dom";
import useFetch from "../../../../hooks/useFetch";
import { useChangeDate } from "../../../../hooks/useChangeDate";
import { CustomSelect } from "../../../SelectList";
import Input from "../../Input";
import toast from "react-hot-toast";

export default function EditDiscount({
  setShowEditDiscount,
  editDiscounts,
  fetchDiscount,
  showEditDiscount,
}) {
  const [haveProductItemId, setHaveProductItemId] = useState(null);
  const [haveProductUser, setHaveProductUser] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [inputDateValue, setInputDateValue] = useState(null);
  const [editDiscount, setEditDiscount] = useState({
    code: haveProductItemId ? null : "",
    expiresIn: "",
    productItemId: haveProductItemId ? "" : null,
    quantity: "",
    relatedUserId: haveProductItemId ? null : "",
    type: "",
    value: "",
  });

  const { formattedDate } = useChangeDate(inputDateValue);
  const [productName, setProductName] = useState(null);
  const [userName, setUserName] = useState(null);

  // fetch edit product infos
  useEffect(() => {
    const getEditDiscountData = async () => {
      const response = await adminAxios.get(`/discount/${editDiscounts}`);
      let $ = response?.data;
      setHaveProductItemId($.productItemId);
      setHaveProductUser($.relatedUserId);
      setEditDiscount({
        code: $.code ? $.code : null,
        expiresIn: $.expiresIn,
        productItemId: $.productItemId ? $.productItemId : null,
        quantity: Number($.quantity),
        relatedUserId: $.relatedUserId ? $.relatedUserId : null,
        type: $.type,
        value: $.value,
      });
      setUserName($.relatedUserUsername);
      setProductName($.productName);
    };
    if (showEditDiscount) {
      getEditDiscountData();
    }
  }, [showEditDiscount]);

  //get data from input and set on setEditDiscount
  const setEditDiscountHandler = (event) => {
    const { name, value } = event.target;

    setEditDiscount({
      ...editDiscount,
      [name]: value,
    });
  };
  const editDiscountHandler = async () => {
    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/discount/edit/${editDiscounts?.id}`,
        {
          ...editDiscount,
          type: Number(editDiscount?.type),
          value: Number(editDiscount?.value),
          expiresIn: inputDateValue?.length
            ? formattedDate
            : editDiscount?.expiresIn,
        }
      );

      if (response.status === 200) {
        setShowEditDiscount(false);
        toast.success("edit discount is successful");
        setLoading(false);

        setServerErrors("");
        fetchDiscount();
      }
    } catch (error) {
      setServerErrors(error?.response?.data);
      setLoading(false);
    }
  };
  const { datas: users } = useFetch("/user", adminAxios);
  const { datas: products } = useFetch("/product", userAxios);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showEditDiscount ? "visible" : "invisible"
      }`}
    >
      <div className="lg:w-[30rem] bg-white-100 dark:bg-black-200 p-1 rounded-xl">
        <span className="sm:mb-5 text-xl font-bold dark:text-white-100 flex justify-center">
          Edit Discount
        </span>
        <p className="text-red-700 text-center">{serverErrors?.message}</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full mx-auto p-4 bg-white rounded-lg text-sm"
        >
          <div
            className={` grid grid-cols-2 gap-4 mt-4 ${
              isLoading && "opacity-20"
            }`}
          >
            {!haveProductItemId?.length && (
              <div>
                <Input
                  labelText="code"
                  placeholder="code"
                  name="code"
                  value={editDiscount?.code}
                  onChange={setEditDiscountHandler}
                  Error={serverErrors?.errors?.code}
                  callback={() => setServerErrors("")}
                />
              </div>
            )}
            <div>
              <Input
                labelText="expiresIn"
                placeholder="expiresIn"
                type="date"
                name="expiresIn"
                value={editDiscount?.expiresIn}
                onChange={setEditDiscountHandler}
                Error={serverErrors?.errors?.expiresIn}
                callback={() => setServerErrors("")}
              />
            </div>
            {haveProductItemId?.length && (
              <div>
                <label
                  htmlFor="productItemId"
                  className="block text-gray-800 font-medium"
                >
                  Product
                </label>
                <CustomSelect
                  options={products?.data.forEach((product) => ({
                    value: product.itemId,
                    label: product.name,
                  }))}
                  onchange={(selectedOptions) => {
                    setEditDiscount({
                      ...editDiscount,
                      productItemId: selectedOptions?.value,
                    });
                  }}
                  defaultValue={{
                    value: editDiscount?.productItemId,
                    label: productName,
                  }}
                />

                <p className="text-red-700">
                  {serverErrors?.errors?.productItemId}
                </p>
              </div>
            )}
            <div>
              <Input
                type="number"
                labelText="quantity"
                placeholder="quantity"
                name="quantity"
                value={editDiscount?.quantity}
                onChange={setEditDiscountHandler}
                Error={serverErrors?.errors?.quantity}
                callback={() => setServerErrors("")}
              />
            </div>

            {!haveProductItemId?.length && haveProductUser && (
              <div>
                <label
                  htmlFor="relatedUserId"
                  className="block text-gray-800 font-medium"
                >
                  relatedUserId
                </label>
                <CustomSelect
                  options={users?.data.forEach((type) => ({
                    value: type.id,
                    label: type.username,
                  }))}
                  onchange={(selectedOptions) => {
                    setEditDiscount({
                      ...editDiscount,
                      relatedUserId: selectedOptions?.value,
                    });
                  }}
                  defaultValue={{
                    value: editDiscount?.relatedUserId,
                    label: userName,
                  }}
                />

                <p className="text-red-700">
                  {serverErrors?.errors?.relatedUserId}
                </p>
              </div>
            )}

            <div>
              <Input
                labelText="type"
                placeholder="type"
                name="type"
                value={editDiscount?.type}
                onChange={setEditDiscountHandler}
                Error={serverErrors?.errors?.type}
                callback={() => setServerErrors("")}
              />
            </div>

            <div>
              <Input
                labelText="value"
                placeholder="value"
                name="value"
                value={editDiscount?.value}
                onChange={setEditDiscountHandler}
                Error={serverErrors?.errors?.value}
                callback={() => setServerErrors("")}
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl dark:text-white-100 mr-2"
              onClick={editDiscountHandler}
            >
              {isLoading ? <FormSpinner /> : "Edit Discount"}
            </button>
            <button
              type="submit"
              className=" w-full py-2 rounded-xl border border-blue-600 ml-2 dark:text-white-100"
              onClick={() => setShowEditDiscount(false)}
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
