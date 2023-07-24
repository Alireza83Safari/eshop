import React from "react";

export default function FilterProducts({ state, dispatch }) {
  return (
    <div className="w-full grid grid-cols-2 mt-4 mb-1">
      <div className="mx-4 px-1 border rounded-lg">
        <select
          name="category"
          className="py-1 text-black-900 w-full outline-none dark:bg-black-200 dark:text-white-100 sm:text-base text-xs"
          value={state.categoryFilter}
          onChange={(e) =>
            dispatch({
              type: "SET_CATEGORY_FILTER",
              payload: e.target.value,
            })
          }
        >
          <option value="">Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Fresh">Fresh</option>
          <option value="Travel">Travel</option>
          <option value="Cloths">Cloths</option>
        </select>
      </div>
      <div className="mx-4 px-1 border rounded-lg">
        <select
          name="status"
          className="py-1 text-black-900 w-full outline-none  dark:bg-black-200 dark:text-white-100 sm:text-base text-xs"
          value={state.statusFilter}
          onChange={(e) =>
            dispatch({
              type: "SET_STATUS_FILTER",
              payload: e.target.value,
            })
          }
        >
          <option value="">Status</option>
          <option value="Publish">Publish</option>
          <option value="Inactive">InActive</option>
        </select>
      </div>
    </div>
  );
}
