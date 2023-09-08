import React, { useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import userAxios from "../../services/Axios/userInterceptors";

function FilterProducts({ setCurrentPage }) {
  const history = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { datas: categoryData } = useFetch("/category/selectList", userAxios);
  const { datas: brandData } = useFetch("/brand", userAxios);

  const handleChange = useCallback(
    (name, value) => {
      searchParams.set(name, value);

      if (value === "All") {
        searchParams.delete(name);
      }

      history(`?${searchParams.toString()}`);
      setCurrentPage(1);
    },
    [searchParams, history, setCurrentPage]
  );

  const MemoizedFilterProducts = useMemo(
    () => (
      <section className="border rounded-xl py-3 my-3 mx-4 w-full grid grid-cols-2 text-black-900 dark:text-white-100">
        <div className="text-xs mx-6 py-2 relative">
          <label htmlFor="minPrice" className="font-medium mb-1">
            Min:
          </label>
          <label
            htmlFor="maxPrice"
            className="font-medium mb-1 absolute right-2"
          >
            Max:
          </label>
          <div className="flex">
            <input
              type="number"
              placeholder="min"
              value={searchParams.get("minPrice") || ""}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              id="minPrice"
              name="minPrice"
              className="block text-sm border border-gray-300 w-1/2 rounded px-3 py-2 mb-2 mr-2 focus:outline-none focus:border-blue-600"
            />
            <input
              type="number"
              placeholder="max"
              value={searchParams.get("maxPrice" || "")}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              id="maxPrice"
              name="maxPrice"
              className="block relative text-sm border border-gray-300 w-1/2 rounded px-3 py-2 mb-2 ml-2 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="text-xs mx-6 py-2">
          <label htmlFor="categoryId" className="font-medium mb-1">
            Category:
          </label>
          <select
            id="categoryId"
            name="categoryId"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={searchParams.get("categoryId") || "All"}
            className="block border border-gray-300 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
          >
            <option value="All">All</option>
            {categoryData?.data.map((cate) => (
              <option key={cate.key} value={cate.key}>
                {cate.value}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs mx-6 py-2">
          <label htmlFor="order" className="font-medium mb-1">
            Sort By Price:
          </label>
          <select
            id="order"
            name="order"
            className="block border border-gray-300 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={searchParams.get("order") || ""}
          >
            <option value="">None</option>
            <option value="cheap">cheap</option>
            <option value="newest">newest</option>
            <option value="topSell">topSell</option>
            <option value="expensive">expensive</option>
          </select>
        </div>

        <div className="text-xs mx-6 py-2">
          <label htmlFor="brandId" className="font-medium mb-1">
            Sort By Brand:
          </label>
          <select
            id="brandId"
            name="brandId"
            className="block border border-gray-300 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={searchParams.get("brandId") || ""}
          >
            <option value="">None</option>
            {brandData?.data.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </section>
    ),
    [categoryData, brandData, searchParams, history, setCurrentPage]
  );

  return MemoizedFilterProducts;
}

export default FilterProducts;
