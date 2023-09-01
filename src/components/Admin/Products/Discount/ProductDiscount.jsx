import React, { useContext, useEffect, useState } from "react";
import { discountValidation } from "../../../../validators/discountValidation";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import Spinner from "../../../Spinner/Spinner";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import ProductsTable from "./ProductTable";

export default function ProductDiscount({ setShowProductDiscount }) {
  const [infos, setInfos] = useState({
    expiresIn: "",
    quantity: "",
    productItemId: "",
    type: "",
    value: "",
  });

  const { setShowDiscount } = useContext(ProductsPanelContext);
  const [errors, setErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productItemId, setProductItemId] = useState(null);
  const [showChooseProduct, setShowChooseProduct] = useState(false);

  const fetchProductItemID = async () => {
    adminAxios
      .get(`/productItem/selectList/${productId}`)
      .then((res) => setProductItemId(res?.data?.data));
  };

  useEffect(() => {
    if (productId?.length > 1) {
      setShowChooseProduct(false);
      fetchProductItemID();
    }
  }, [productId]);

  const addProductDiscount = async () => {
    const productInfos = {
      expiresIn: infos?.expiresIn,
      quantity: Number(infos?.quantity),
      productItemId: productItemId && productItemId[0].itemId,
      type: Number(infos?.type),
      value: Number(infos?.value),
    };

    discountValidation(infos, errors, setErrors);
    setIsLoading(true);
    try {
      const response = await adminAxios.post(`/discount`, productInfos);
      setIsLoading(false);
      if (response.status === 200) {
        setShowDiscount(false);
        setShowChooseProduct(false);
        setShowProductDiscount(false);
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
          Add Product Discount
        </span>
        <p className="text-red-700 text-xs text-center">
          {serverErrors?.message}
        </p>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="relatedproductId"
                  className="block text-gray-800 font-medium"
                >
                  Product
                </label>

                <button
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 text-start"
                  onClick={() => setShowChooseProduct(true)}
                >
                  {!productId ? "click for choose" : `${productName}`}
                </button>
                <p className="text-red-700 text-xs">
                  {errors?.relatedproductId}
                </p>
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
                  {errors?.type}
                  {serverErrors?.errors?.type}
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
            </div>
            {showChooseProduct && (
              <ProductsTable
                setProductId={setProductId}
                setProductName={setProductName}
              />
            )}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
                onClick={addProductDiscount}
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
