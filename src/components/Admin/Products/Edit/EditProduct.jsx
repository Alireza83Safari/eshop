import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import { productFormValidation } from "../../../../validators/productFormValidation";
import useFetch from "../../../../hooks/useFetch";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../../SelectList";

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
    topFeatures: [" "],
  });

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

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
    if (productEditId) {
      fetchData();
    }
  }, [showEditModal]);

  const editProductHandler = async () => {
    productFormValidation(productInfo, errors, setErrors);
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
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-gray-100 h-screen flex items-center justify-center transition duration-400 ${
        showEditModal ? "visible" : "invisible"
      }`}
    >
      <div className="lg:w-[32rem] bg-white-100 p-5 rounded-xl">
        <span className="text-xl font-bold flex justify-center">
          Edit Product
        </span>

        <form
          className="w-full max-w-sm mx-auto bg-white rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <div
            className={` grid grid-cols-2 gap-4 text-sm mt-4 ${
              isLoading && "opacity-20"
            }`}
          >
            <div className="col-span-2">
              <label htmlFor="name" className="block text-gray-800 font-medium">
                Name
              </label>
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                value={productInfo?.name}
                onChange={setProductInfos}
              />
              <p className="text-sm text-red-700">{errors?.name}</p>
            </div>
            <div>
              <label
                htmlFor="topFeatures"
                className="block text-gray-800 font-medium"
              >
                topFeatures
              </label>
              <input
                type="text"
                placeholder="Product topFeatures"
                name="topFeatures"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                value={productInfo?.topFeatures}
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
              <CustomSelect
                options={category?.data.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onchange={(selectedOptions) => {
                  setProductInfo({
                    ...productInfo,
                    categoryId: selectedOptions?.value,
                  });
                  setErrors("");
                }}
              />
              <p className="text-sm text-red-700">{errors?.categoryId}</p>
            </div>

            <div>
              <label
                htmlFor="brandId"
                className="block text-gray-800 font-medium"
              >
                Brand
              </label>
              <CustomSelect
                options={brands?.data.map((brand) => ({
                  value: brand.id,
                  label: brand.name,
                }))}
                onchange={(selectedOptions) => {
                  setProductInfo({
                    ...productInfo,
                    categoryId: selectedOptions?.value,
                  });
                  setErrors("");
                }}
              />
              <p className="text-sm text-red-700">{errors?.brandId}</p>
            </div>

            <div>
              <label htmlFor="code" className="block text-gray-800 font-medium">
                code
              </label>
              <input
                type="text"
                name="code"
                placeholder="Product Code"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                value={productInfo?.code}
                onChange={setProductInfos}
              />
              <p className="text-sm text-red-700">{errors?.code}</p>
            </div>

              <div className="col-span-2">
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
                  className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                  value={productInfo?.shortDescription}
                  onChange={setProductInfos}
                />
                <p className="text-sm text-red-700">
                  {errors?.shortDescription}
                </p>
              </div>

              <div className="col-span-2">
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
                  className="border py-4 px-2 w-full rounded-lg outline-none focus:border-blue-600"
                  value={productInfo?.description}
                  onChange={setProductInfos}
                />
                <p className="text-sm text-red-700">{errors?.description}</p>
              </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 disabled:bg-gray-100 text-white-100 w-1/2 py-2 rounded-xl mr-2"
              onClick={editProductHandler}
            >
              {isLoading ? <FormSpinner /> : "Edit Product"}
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 rounded-xl border ml-2"
              onClick={() => setShowEditModal(false)}
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
