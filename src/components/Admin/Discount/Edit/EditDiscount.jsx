import React, { useEffect, useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
import useFetch from "../../../../hooks/useFetch";
import { useChangeToInputDate } from "../../../../hooks/useChangeToInputDate";
import { useChangeDate } from "../../../../hooks/useChangeDate";
import { CustomSelect } from "../../../SelectList";

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

  const { chanageToInputDate } = useChangeToInputDate(editDiscount?.expiresIn);
  const { formattedDate } = useChangeDate(inputDateValue);
  const [productName, setProductName] = useState(null);
  const [userName, setUserName] = useState(null);

  // fetch edit product infos
  useEffect(() => {
    setLoading(true);
    const getEditDiscountData = async () => {
      const response = await adminAxios.get(`/discount/${editDiscounts?.id}`);
      let $ = response?.data;
      setLoading(false);
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
      <div className="lg:w-[30rem] bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
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
                <label
                  htmlFor="code"
                  className="block text-gray-800 font-medium"
                >
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="discount code"
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                  onChange={setEditDiscountHandler}
                  value={editDiscount?.code}
                  onFocus={() => setServerErrors("")}
                />

                <p className="text-red-700">{serverErrors?.errors?.code}</p>
              </div>
            )}
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
                placeholder="discount expiresIn"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                onChange={(e) => setInputDateValue(e.target.value)}
                value={chanageToInputDate || ""}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.expiresIn}</p>
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
                  options={products?.data.map((product) => ({
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
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                onChange={setEditDiscountHandler}
                value={editDiscount?.quantity}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.errors?.quantity}</p>
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
                  options={users?.data.map((type) => ({
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
              <label htmlFor="type" className="block text-gray-800 font-medium">
                type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                placeholder="type"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                onChange={setEditDiscountHandler}
                value={editDiscount?.type}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.errors?.type}</p>
            </div>

            <div>
              <label
                htmlFor="value"
                className="block text-gray-800 font-medium"
              >
                value
              </label>
              <input
                type="text"
                id="value"
                name="value"
                placeholder="value"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                onChange={setEditDiscountHandler}
                value={editDiscount?.value}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.errors?.value}</p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
              onClick={editDiscountHandler}
            >
              {isLoading ? <FormSpinner /> : "Edit Discount"}
            </button>
            <button
              type="submit"
              className=" w-full py-2 rounded-xl border border-blue-600 ml-2"
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
