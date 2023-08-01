import React from "react";

export default function FilterProducts({ state, dispatch, showFilterInSm }) {
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
            id="minPrice"
            name="minPrice"
            value={state.minPrice}
            onChange={handleMinPriceChange}
            className="block text-sm border border-gray-300 w-1/2 rounded px-3 py-2 mb-2 mr-2 focus:outline-none focus:border-blue-600"
          />
          <input
            type="number"
            placeholder="max"
            id="maxPrice"
            name="maxPrice"
            value={state.maxPrice}
            onChange={handleMaxPriceChange}
            className="block relative text-sm border border-gray-300 w-1/2 rounded px-3 py-2 mb-2 ml-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex"></div>
      </div>

      <div className="text-xs mx-6 py-2">
        <label htmlFor="category" className="font-medium mb-1">
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={state.selectedCategory}
          onChange={handleCategoryChange}
          className="block border border-gray-300 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Fresh">Fresh</option>
          <option value="Travel">Travel</option>
          <option value="Cloths">Cloths</option>
        </select>
      </div>

      <div className="text-xs mx-6 py-2">
        <label htmlFor="sort" className="font-medium mb-1">
          Sort By Price:
        </label>
        <select
          id="sort"
          name="sort"
          value={state.sortBy}
          onChange={handleSortChange}
          className="block border border-gray-300 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
        >
          <option value="">None</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="text-xs mx-6 py-2">
        <label htmlFor="sort" className="font-medium mb-1">
          Sort By Count:
        </label>
        <select
          id="sort"
          name="sort"
          value={state.sortBy}
          onChange={handleSortChange}
          className="block border border-gray-300 w-full rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-600"
        >
          <option value="">None</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
    </section>
  );
}
