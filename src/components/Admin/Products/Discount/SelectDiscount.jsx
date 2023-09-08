import React, { useState } from "react";

export default function SelectDiscount({
  setShowDiscount,
  setShowProductDiscount,
  setShowUserDiscount,
}) {
  const [discountModel, setDiscountModel] = useState({ item: "" });

  const setDiscountItem = (e) => {
    setDiscountModel(e.target.value);
    if (discountModel.length > 1 && discountModel === "user") {
      setShowUserDiscount(true);
      setShowDiscount(false);
    } else if (discountModel.length > 1 && discountModel === "product") {
      setShowProductDiscount(true);
      setShowDiscount(false);
    }
  };
  return (
    <>
      <span className="mb-5 text-xl font-bold flex justify-center">
        Select Discount
      </span>

      <>
        <div className="grid grid-cols-1 gap-4 mt-2">
          <div>
            <label htmlFor="user" className="block text-gray-800 font-medium">
              Choose Item
            </label>
            <select
              id="user"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
              onChange={(e) => setDiscountModel(e.target.value)}
              value={discountModel}
            >
              <option value="">Select Model</option>
              <option value="user">user</option>
              <option value="product">product</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 disabled:bg-gray-200"
            onClick={setDiscountItem}
            disabled={discountModel?.length == ""}
          >
            Next
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-xl border border-blue-600 ml-2"
            onClick={() => setShowDiscount(false)}
          >
            Cancel
          </button>
        </div>
      </>
    </>
  );
}
