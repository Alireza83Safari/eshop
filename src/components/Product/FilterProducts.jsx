import React, { useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import userAxios from "../../services/Axios/userInterceptors";
import { CustomSelect } from "../SelectList";

function FilterProducts({ setCurrentPage }) {
  const navigate = useNavigate();
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

      navigate(`?${searchParams.toString()}`);
      setCurrentPage(1);
    },
    [searchParams, navigate, setCurrentPage]
  );

  const MemoizedFilterProducts = useMemo(
    () => (
      <section className="border rounded-xl py-3 my-5 mt-6 mx-4 w-full grid grid-cols-2 text-black-900 dark:text-white-100">
        <div className="text-xs mx-6 mt-2 relative">
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
              className="block text-sm border border-gray-300 w-1/2 rounded-[8px] px-3 py-2 mr-2 focus:outline-none focus:border-blue-600 dark:bg-black-200"
            />
            <input
              type="number"
              placeholder="max"
              value={searchParams.get("maxPrice" || "")}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              id="maxPrice"
              name="maxPrice"
              className="block relative text-sm border border-gray-300 w-1/2 rounded-[8px] px-3 py-2 ml-2 focus:outline-none focus:border-blue-600  dark:bg-black-200"
            />
          </div>
        </div>

        <div className="text-xs mx-6 py-2">
          <label htmlFor="categoryId" className="font-medium mb-1">
            Category:
          </label>

          <CustomSelect
            options={categoryData?.data.map((category) => ({
              value: category.key,
              label: category.value,
            }))}
            name="categoryId"
            onchange={(selectedOptions) => {
              handleChange("categoryId", selectedOptions.value);
            }}
          />
        </div>

        <div className="text-xs mx-6 py-2">
          <label htmlFor="order" className="font-medium mb-1">
            Sort By Price:
          </label>

          <CustomSelect
            options={["None", "cheap", "newest", "topSell", "expensive"].map(
              (item) => ({ value: item, label: item })
            )}
            name="order"
            onchange={(selectedOptions) => {
              handleChange("order", selectedOptions);
            }}
          />
        </div>

        <div className="text-xs mx-6 py-2">
          <label htmlFor="brandId" className="font-medium mb-1">
            Sort By Brand:
          </label>
          <CustomSelect
            options={brandData?.data.map((brand) => ({
              value: brand.id,
              label: brand.name,
            }))}
            name="brandId"
            onchange={(selectedOptions) => {
              handleChange("brandId", selectedOptions.value);
            }}
          />
        </div>
      </section>
    ),
    [categoryData, brandData, searchParams, navigate, setCurrentPage]
  );

  return MemoizedFilterProducts;
}

export default FilterProducts;
