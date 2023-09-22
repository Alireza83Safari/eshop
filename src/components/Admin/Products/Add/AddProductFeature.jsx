import React, { useContext, useState } from "react";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import useFetch from "../../../../hooks/useFetch";
import FormSpinner from "../../../FormSpinner/FormSpinner";

export default function AddProductFeature({
  setShowProductFeature,
  setShowFile,
}) {
  const { fetchProductList, newProductId, setShowAddProductModal } =
    useContext(ProductsPanelContext);

  const [isLoading, setLoading] = useState(false);

  const addNewProducts = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/productFeatureValue/${newProductId}`,
        values
      );

      if (response.status === 200) {
        fetchProductList();
        setShowFile(true);
        setShowProductFeature(false);
        setLoading(false);
      } else if (response.status === 422) {
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const { datas: featureKey } = useFetch("/productFeatureKey", adminAxios);

  const [values, setValues] = useState([]);

  const handleInputChange = (id, value) => {
    const index = values.findIndex((item) => item.productFeatureKeyId === id);

    if (index !== -1) {
      const updatedValues = [...values];
      updatedValues[index] = { productFeatureKeyId: id, value: value };
      setValues(updatedValues);
    } else {
      setValues([...values, { productFeatureKeyId: id, value: value }]);
    }
  };

  return (
    <>
      <span className="mb-5 text-xl font-bold flex justify-center dark:text-white-100">
        Add New Product Feature
      </span>

      <form onSubmit={addNewProducts}>
        <div
          className={`grid grid-cols-2 gap-x-8 gap-y-4 mt-2 text-sm h-[18rem] ${
            isLoading && "opacity-20"
          }`}
        >
          {featureKey?.data.map((item) => (
            <div key={item.id}>
              <label className="dark:text-white-100">{item.name}: </label>
              <input
                type="text"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                placeholder={item.name}
                value={
                  values.find((v) => v.productFeatureKeyId === item.id)
                    ?.value || ""
                }
                onChange={(e) => handleInputChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-x-8">
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-600 text-white-100"
            onSubmit={addNewProducts}
          >
            {isLoading ? <FormSpinner /> : "Add Product Feature"}
          </button>
          <button
            type="button"
            className="w-full py-2 rounded-xl border border-blue-600 dark:text-white-100"
            onClick={() => {
              setShowProductFeature(false);
              setShowAddProductModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
