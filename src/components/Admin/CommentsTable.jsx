import React from "react";

export default function CommentsTable({ paginatedProducts }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="sm:text-xs text-[12px] 2xl:text-lg grid lg:grid-cols-5 grid-cols-4 border-b">
          <th className="col-span-1 sm:py-2 py-3">User</th>
          <th className="col-span-1 sm:py-2 py-3">Comment</th>
          <th className="col-span-1 sm:py-2 py-3 lg:flex hidden">Product</th>
          <th className="col-span-1 sm:py-2 py-3">Date</th>
          <th className="col-span-1 sm:py-2 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {paginatedProducts.map((comment) => (
          <tr
            className="sm:text-xs text-[10px] 2xl:text-sm grid lg:grid-cols-5 grid-cols-4 px-4"
            key={comment.id}
          >
            <td className="col-span-1 sm:py-2 py-3 flex items-center">
              <img
                src="https://lledogrupo.com/wp-content/uploads/2018/04/user-img-1.png"
                className="w-8 h-8 mr-3 sm:block hidden"
                alt="User Avatar"
              />
              <p className="font-bold">{comment.user}</p>
            </td>

            <td className="col-span-1 sm:py-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden pr-4">
              {comment.text}
            </td>
            <td className="col-span-1 sm:py-2 py-3 whitespace-nowrap overflow-auto text-ellipsis lg:flex hidden">
              {comment.product}
            </td>
            <td className="col-span-1 sm:py-2 py-3">
              {comment.date.toLocaleString()}$
            </td>
            <td className="col-span-1 sm:py-2 py-3">
              <button
                className={` text-[10px] font-black px-2 py-1 rounded-lg ${
                  comment.status === "accept"
                    ? "bg-green-100 text-green-300"
                    : "bg-orange-100 text-orange-400"
                }`}
              >
                {comment.status}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
