import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { productFormValidation } from "../../../validators/productFormValidation";
import Spinner from "../../Spinner/Spinner";
import useFetch from "../../../hooks/useFetch";

export default function EditProduct() {
  const { setShowEditModal, showEditModal, productEditId, fetchProductList } =
    useContext(ProductsPanelContext);

  const [productInfo, setProductInfo] = useState({
    brandId: "",
    name: "",
    categoryId: "",
    code: "",
    shortDescription: "",
    description: "",
    topFeatures: null,
  });

  const [isLoading, setLoading] = useState(false);
  const [formHaveError, setFormHaveError] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    categoryId: "",
    brandId: "",
    code: "",
    shortDescription: "",
    description: "",
  });

  const setProductInfos = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };
  const { datas: brands } = useFetch("/brand", adminAxios);
  const { datas: category } = useFetch("/category", adminAxios);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        adminAxios.get(`/product/${productEditId}`).then((infos) => {
          setProductInfo({
            ...productInfo,
            brandId: infos?.data.brandId,
            name: infos?.data.name,
            categoryId: infos?.data.categoryId,
            code: infos?.data.code,
            shortDescription: infos?.data.shortDescription,
            description: infos?.data.description,
            topFeatures: infos?.data.topFeatures,
          });
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, [showEditModal]);

  const editProductHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/product/edit/${productEditId}`,
        productInfo
      );
      if (response.status === 200) {
        setShowEditModal(false);
        fetchProductList();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const hasError = Object.values(errors).some((error) => error !== "");
    setFormHaveError(hasError);
  }, [errors]);

  useEffect(() => {
    productFormValidation(productInfo, errors, setErrors);
  }, [productInfo]);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-gray-100 h-screen flex items-center justify-center transition duration-400 ${
        showEditModal ? "visible" : "invisible"
      }`}
    >
      <div className="w-1/3  bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Product
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg"
            onSubmit={editProductHandler}
          >
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-800 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    value={productInfo?.name}
                    onChange={setProductInfos}
                  />
                  <p className="text-sm text-red-700">{errors?.name}</p>
                </div>

                <div>
                  <label
                    htmlFor="categoryId"
                    className="block text-gray-800 font-medium"
                  >
                    Category
                  </label>
                  <select
                    as="select"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    name="categoryId"
                    value={productInfo?.categoryId}
                    onChange={setProductInfos}
                  >
                    <option value="">Select a Category</option>
                    {category &&
                      category?.data.map((cate) => (
                        <option key={cate.id} value={cate.id}>
                          {cate.name}
                        </option>
                      ))}
                  </select>
                  <p className="text-sm text-red-700">{errors?.categoryId}</p>
                </div>

                <div>
                  <label
                    htmlFor="brandId"
                    className="block text-gray-800 font-medium"
                  >
                    Brand
                  </label>
                  <select
                    name="brandId"
                    as="select"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    value={productInfo?.brandId}
                    onChange={setProductInfos}
                  >
                    <option value="">Select a brand</option>
                    {brands &&
                      brands?.data.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                  </select>
                  <p className="text-sm text-red-700">{errors?.brandId}</p>
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
                    name="code"
                    placeholder="Product Code"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    value={productInfo?.code}
                    onChange={setProductInfos}
                  />
                  <p className="text-sm text-red-700">{errors?.code}</p>
                </div>
              </div>

              <div>
                <div>
                  <label
                    htmlFor="shortDescription"
                    className="block text-gray-800 font-medium"
                  >
                    Short Description
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    placeholder="Product Short Description"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    value={productInfo?.shortDescription}
                    onChange={setProductInfos}
                  />
                  <p className="text-sm text-red-700">
                    {errors?.shortDescription}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-800 font-medium"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Product Description"
                    className="border py-4 px-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    value={productInfo?.description}
                    onChange={setProductInfos}
                  />
                  <p className="text-sm text-red-700">{errors?.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="click"
                className="bg-blue-600 disabled:bg-gray-100 text-white-100 w-1/2 py-2 rounded-xl mr-2"
                onClick={editProductHandler}
                disabled={formHaveError}
              >
                Edit Product
              </button>
              <button
                type="click"
                className="w-1/2 py-2 rounded-xl border ml-2"
                onclick={() => setShowEditModal(false)}
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
