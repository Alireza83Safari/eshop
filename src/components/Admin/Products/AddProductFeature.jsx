import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import adminAxios from "../../../services/Axios/adminInterceptors"
import useFetch from "../../../hooks/useFetch";
import Spinner from "../../Spinner/Spinner";

export default function AddProductFeature() {
  const {
    fetchProductList,
    setShowProductFeature,
    setNewProductId,
    newProductId,
    setShowFile,
  } = useContext(ProductsPanelContext);

  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const addNewProducts = async (data) => {
    data.preventDefault();

    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/productFeatureValue/${newProductId}`,
        values
      );
      //setNewProductId(response?.data.data);
      console.log(response);
      if (response.status === 200) {
        fetchProductList();
        setShowFile(true);
        setLoading(false);
      } else if (response.status === 422) {
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
      console.log(error);
    }
  };

  const { datas: featuteKey } = useFetch("/productFeatureKey", adminAxios);

  const [values, setValues] = useState({ productFeatureKeyId: "", value: "" });
  const handleInputChange = (id, value) => {
    setValues({ ...values, productFeatureKeyId: id , value: value });
  };

  console.log(values);
  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="w-2/5 bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add New Product Feature
        </span>

        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-2">
              {featuteKey?.data.map((item) => (
                <div key={item.id}>
                  <label>{item.name}: </label>
                  <input
                    type="text"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    placeholder={item.name}
                    value={values[item.id] || ""}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-x-8">
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-blue-600 text-white-100"
                onClick={addNewProducts}
              >
                Add Product Feature
              </button>
              <button
                type="submit"
                className="w-full py-2 rounded-xl border border-blue-600"
                onClick={() => setShowProductFeature(false)}
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
