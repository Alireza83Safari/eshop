import React, { useContext } from "react";
import ProductsPanelContext from "./ProductsPanelContext";

export default function FilterProducts() {
  const { category, brands } = useContext(ProductsPanelContext);
  return (
    <div className="w-full grid grid-cols-2 mt-4 mb-1">
      <div className="mx-4 px-1 border rounded-lg">
        <select
          name="category"
          className="py-1 text-black-900 w-full outline-none dark:bg-black-200 dark:text-white-100 sm:text-base text-xs"
        >
          <option value="">Category</option>
          {category.map((cate) => (
            <option value={cate.id}>{cate.name}</option>
          ))}
        </select>
      </div>
      <div className="mx-4 px-1 border rounded-lg">
        <select
          name="brand"
          className="py-1 text-black-900 w-full outline-none  dark:bg-black-200 dark:text-white-100 sm:text-base text-xs"
        >
          <option value="">Status</option>
          {brands.map((brand) => (
            <option value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
