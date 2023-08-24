import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function FilterProducts({ showFilterInSm, setCurrentPage }) {
  const history = useNavigate();
  const location = useParams();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { datas: categoryData } = useFetch("/api/v1/user/category/selectList");
  const { datas: brandData } = useFetch("/api/v1/user/brand");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const searchParams = new URLSearchParams(location.search);

    if (value === "All") {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }

    history({ search: searchParams.toString() });

    setCurrentPage(1);
  };

  const handlePrice = () => {
    const searchParams = new URLSearchParams(location.search);
    const newMinPrice = minPrice !== "" ? parseInt(minPrice) : null;
    const newMaxPrice = maxPrice !== "" ? parseInt(maxPrice) : null;

    if (newMinPrice !== null) {
      searchParams.set("minPrice", newMinPrice);
    } else {
      searchParams.delete("minPrice");
    }
    if (newMaxPrice !== null) {
      searchParams.set("maxPrice", newMaxPrice);
    } else {
      searchParams.delete("maxPrice");
    }

    history({ search: searchParams.toString() });

    setCurrentPage(1);
  };

  return (
    <section
      className={`" border rounded-xl py-3 my-3 mx-4 w-full grid grid-cols-2 text-black-900 dark:text-white-100 " ${
        showFilterInSm ? "" : "hidden"
      } `}
    >
      <div className="text-xs mx-6 py-2 relative">
        <label htmlFor="minPrice" className="font-medium mb-1">
          Min:
        </label>
        <label
          htmlFor="maxPrice"
          className="font-medium mb-1  absolute right-2"
        >
          Max:
        </label>
        <div className="flex">
          <input
            type="number"
            placeholder="min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            id="minPrice"
            name="minPrice"
            className="block text-sm border border-gray-300 w-1/2 rounded px-3 py-2 mb-2 mr-2 focus:outline-none focus:border-blue-600"
          />
          <input
            type="number"
            placeholder="max"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              handlePrice();
            }}
            id="maxPrice"
            name="maxPrice"
            className="block relative text-sm border border-gray-300 w-1/2 rounded px-3 py-2 mb-2 ml-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex"></div>
      </div>

      <div className="text-xs mx-6 py-2">
        <label htmlFor="categoryId" className="font-medium mb-1">
          Category:
        </label>
        <select
          id="categoryId"
          name="categoryId"
          onChange={handleInputChange}
          className="block border border-gray-300 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
        >
          <option value="All">All</option>
          {categoryData?.data.map((cate) => (
            <option value={cate.key}>{cate.value}</option>
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
          onChange={handleInputChange}
        >
          <option value="">None</option>
          <option value="cheap">cheap</option>
          <option value="newest">newest</option>
          <option value="topSell">topSell</option>
          <option value="expersive">expersive</option>
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
          onChange={handleInputChange}
        >
          <option value="">None</option>
          {brandData?.data.map((brand) => (
            <option value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>
    </section>
  );
}
