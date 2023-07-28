import React, { useContext, useEffect, useReducer, useState } from "react";
import productsContext from "../Context/productsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faFilter } from "@fortawesome/free-solid-svg-icons";

export default function FilterProducts({ state, dispatch }) {
  const { getProducts } = useContext(productsContext);

  const handleMinPriceChange = (event) => {
    dispatch({ type: "SET_MIN_PRICE", payload: event.target.value });
  };

  const handleMaxPriceChange = (event) => {
    dispatch({ type: "SET_MAX_PRICE", payload: event.target.value });
  };

  const handleCategoryChange = (event) => {
    dispatch({ type: "SET_CATEGORY", payload: event.target.value });
  };

  const handleSortChange = (event) => {
    dispatch({ type: "SET_SORT", payload: event.target.value });
  };

  const filterProducts = (product) => {
    const { minPrice, maxPrice, selectedCategory } = state;
    const priceFilter =
      (!minPrice && !maxPrice) ||
      (minPrice && !maxPrice && product.price >= parseFloat(minPrice)) ||
      (!minPrice && maxPrice && product.price <= parseFloat(maxPrice)) ||
      (minPrice &&
        maxPrice &&
        product.price >= parseFloat(minPrice) &&
        product.price <= parseFloat(maxPrice));

    const categoryFilter =
      selectedCategory === "All" || product.category === selectedCategory;

    return priceFilter && categoryFilter;
  };

  const sortedProducts = getProducts.filter(filterProducts).sort((a, b) => {
    const { sortBy } = state;
    if (sortBy === "lowToHigh") {
      return a.price - b.price;
    } else if (sortBy === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });
  const [showFilterInSm, setShowFilterInSm] = useState(false);
  return (
    <div>
      <div className="flex justify-center">
        <button
          className="text-xl md:hidden flex"
          onClick={() => setShowFilterInSm(!showFilterInSm)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              fillRule="evenodd"
              d="M15 10.5A3.502 3.502 0 0018.355 8H21a1 1 0 100-2h-2.645a3.502 3.502 0 00-6.71 0H3a1 1 0 000 2h8.645A3.502 3.502 0 0015 10.5zM3 16a1 1 0 100 2h2.145a3.502 3.502 0 006.71 0H21a1 1 0 100-2h-9.145a3.502 3.502 0 00-6.71 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      {/* <FontAwesomeIcon
        icon={faFileContract}

      /> */}
      <div
        className={` " md:fixed md:border-none border rounded-xl md:block  grid-cols-2 " ${
          showFilterInSm ? "grid " : "hidden"
        } `}
      >
        <div className="md:mb-8 text-xs md:mx-0 mx-6 relative">
          <label htmlFor="minPrice" className="font-medium mb-1">
            Min:
          </label>
          <label
            htmlFor="maxPrice"
            className="font-medium mb-1 md:ml-8 absolute right-2"
          >
            Max:
          </label>
          <div className="flex">
            <input
              type="number"
              placeholder="min"
              id="minPrice"
              name="minPrice"
              value={state.minPrice}
              onChange={handleMinPriceChange}
              className="block text-sm border border-gray-300 md:w-20 w-1/2 rounded px-3 py-2 mb-2 mr-2 focus:outline-none focus:border-blue-600"
            />
            <input
              type="number"
              placeholder="max"
              id="maxPrice"
              name="maxPrice"
              value={state.maxPrice}
              onChange={handleMaxPriceChange}
              className="block relative text-sm border border-gray-300 md:w-20 w-1/2 rounded px-3 py-2 mb-2 ml-2 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex"></div>
        </div>

        <div className="md:mb-8 text-xs md:mx-0 mx-6">
          <label htmlFor="category" className="font-medium mb-1">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={state.selectedCategory}
            onChange={handleCategoryChange}
            className="block border border-gray-300 md:w-44 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Fresh">Fresh</option>
            <option value="Travel">Travel</option>
            <option value="Cloths">Cloths</option>
          </select>
        </div>

        <div className="md:mb-8 text-xs md:mx-0 mx-6">
          <label htmlFor="sort" className="font-medium mb-1">
            Sort By Price:
          </label>
          <select
            id="sort"
            name="sort"
            value={state.sortBy}
            onChange={handleSortChange}
            className="block border border-gray-300 md:w-44 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
          >
            <option value="">None</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="md:mb-8 text-xs md:mx-0 mx-6">
          <label htmlFor="sort" className="font-medium mb-1">
            Sort By Count:
          </label>
          <select
            id="sort"
            name="sort"
            value={state.sortBy}
            onChange={handleSortChange}
            className="block border border-gray-300 md:w-44 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
          >
            <option value="">None</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="md:mb-8 text-xs md:mx-0 mx-6">
          <label htmlFor="sort" className="font-medium mb-1">
            Sort By Count:
          </label>
          <select
            id="sort"
            name="sort"
            value={state.sortBy}
            onChange={handleSortChange}
            className="block border border-gray-300 md:w-44 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
          >
            <option value="">None</option>
            <option value="blue" className="bg-blue-600">
              Blue
            </option>
            <option value="red" className="bg-red-700">
              Red
            </option>
            <option value="green" className="bg-white-100">
              Green
            </option>
            <option value="white" className="bg-green-300">
              White
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
