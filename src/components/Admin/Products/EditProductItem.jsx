/* import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import adminAxios from "../../../services/Axios/adminInterceptors";
import useFetch from "../../../hooks/useFetch";
import FormSpinner from "../../FormSpinner/FormSpinner";

export default function EditProductItem() {
  const {
    showEditItem,
    setShowEditItem,
    productEditId,
    fetchProductList,
    productInfos,
  } = useContext(ProductsPanelContext);
  const [productInfo, setProductInfo] = useState({
    colorId: "",
    isMainItem: true,
    price: 0,
    productId: "",
    quantity: 0,
    status: 0,
  });

  const [isLoading, setLoading] = useState(true);
  const [formHaveError, setFormHaveError] = useState(null);
  const [errors, setErrors] = useState({});

  const setProductInfos = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        adminAxios
          .get(`/productItem/product/${productEditId}`)
          .then((infos) => {
            setProductInfo({
              ...productInfo,
              colorId: infos?.data[0]?.colorId,
              isMainItem: infos?.data[0]?.isMainItem,
              price: infos?.data[0]?.price,
              productId: infos?.data[0]?.productId,
              quantity: infos?.data[0]?.quantity,
              status: infos?.data[0]?.status,
            });
          });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (showEditItem) {
      fetchData();
    }
  }, [showEditItem]);
  console.log(productInfos);
  const editProductHandler = async () => {
    setLoading(true);

    try {
      const response = await adminAxios.post(
        `/productItem/edit/${productEditId}`,
        productInfo
      );
      console.log(response);
      if (response.status === 200) {
        setShowEditItem(false);
        fetchProductList();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const hasError = Object.values(errors).some((error) => error !== "");
    setFormHaveError(hasError);
  }, [errors]);

  useEffect(() => {
    //productFormValidation(productInfo, errors, setErrors);
  }, [productInfo]);
  //console.log(productInfo);
  const { datas: colors } = useFetch("/color", adminAxios);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-gray-100 h-screen flex items-center justify-center transition duration-400 ${
        showEditItem ? "visible" : "invisible"
      }`}
    >
      <div className="w-1/3  bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Product Item
        </span>

        <form
          className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <div
            className={` grid grid-cols-1 gap-4 mt-4 ${
              isLoading && "opacity-20"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-sapn-2">
                <label
                  htmlFor="colorId"
                  className="block text-gray-800 font-medium"
                >
                  color
                </label>
                <select
                  name="colorId"
                  as="select"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  value={productInfo?.colorId}
                  onChange={setProductInfos}
                >
                  <option value="">select a color</option>
                  {colors &&
                    colors?.data.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                </select>
                <p className="text-sm text-red-700">{errors?.colorId}</p>
              </div>

              <div>
                <label
                  htmlFor="isMainItem"
                  className="block text-gray-800 font-medium"
                >
                  isMainItem
                </label>
                <select
                  name="isMainItem"
                  as="select"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  value={productInfo?.isMainItem}
                  onChange={setProductInfos}
                >
                  <option value="">select a isMainItem</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                <p className="text-sm text-red-700">{errors?.isMainItem}</p>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-800 font-medium"
                >
                  price
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="Product price"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  value={productInfo?.price}
                  onChange={setProductInfos}
                />
                <p className="text-sm text-red-700">{errors?.price}</p>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-gray-800 font-medium"
                >
                  status
                </label>
                <select
                  name="status"
                  as="select"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  value={productInfo?.status}
                  onChange={setProductInfos}
                >
                  <option value="">select a status</option>
                  <option value="0">Publish</option>
                  <option value="1">in Active</option>
                </select>
                <p className="text-sm text-red-700">{errors?.status}</p>
              </div>

              <div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-gray-800 font-medium"
                  >
                    quantity
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="Product quantity"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    value={productInfo?.quantity}
                    onChange={setProductInfos}
                  />
                  <p className="text-sm text-red-700">{errors?.quantity}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 disabled:bg-gray-100 text-white-100 w-1/2 py-2 rounded-xl mr-2"
              onClick={editProductHandler}
              disabled={formHaveError}
            >
              {isLoading ? <FormSpinner /> : "Edit Product"}
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 rounded-xl border ml-2"
              onClick={() => setShowEditItem(false)}
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
 */
