import React from "react";

export default function Pagination({
  pageNumber,
  setCurrentPage,
  currentPage,
}) {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center absolute bottom-2">
        {pageNumber?.map((page, index) => (
          <div
            className={`" flex items-center justify-center rounded-md font-bold sm:w-8 sm:h-8 m-2 w-6 h-6 p-3 " ${
              currentPage === page + 1
                ? "bg-blue-600 text-white-100"
                : "bg-white-200 text-black-600"
            }`}
            onClick={() => setCurrentPage(page + 1)}
            key={index}
          >
            <p className="sm:text-base text-sm"> {page + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
