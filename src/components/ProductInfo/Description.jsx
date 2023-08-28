import React from "react";

export default function Description({ productItem }) {
  return (
    <div className="border rounded-xl p-4 mb-20">
      <h3>Product Full Description</h3>
      <p className="text-gray-200 text-xs leading-5 mt-4">
        {productItem?.productDescription}
      </p>
    </div>
  );
}
