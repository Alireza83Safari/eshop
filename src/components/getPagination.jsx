import React, { useMemo } from "react";

export default function Pagination({
  pagesCount,
  setCurrentPage,
  currentPage,
}) {
  let arrayPage = Array.from(Array(pagesCount).keys());
  const currentPageIndex = currentPage - 1;
  const showPage = useMemo(() => {
    if (pagesCount <= 5) {
      return arrayPage;
    } else if (currentPageIndex <= 2) {
      return arrayPage.slice(0, 5);
    } else if (currentPageIndex >= pagesCount - 3) {
      return arrayPage.slice(pagesCount - 5, pagesCount);
    } else {
      return arrayPage.slice(currentPageIndex - 2, currentPageIndex + 3);
    }
  }, [arrayPage, currentPageIndex, pagesCount]);

  return (
    <>
      {pagesCount > 1 && (
        <nav className="flex justify-center">
          <ul className="flex absolute bottom-0" aria-current="page">
            {currentPageIndex > 0 && (
              <li
                onClick={() => setCurrentPage(currentPageIndex)}
                className="flex items-center justify-center"
              >
                <span className="text-xs dark:text-white-100">Previous</span>
              </li>
            )}
            {showPage?.map((i) => (
              <li
                className={`flex items-center justify-center rounded-md font-bold md:w-9 w-8 md:h-9 h-8 m-2 p-3 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white-100 mx-2"
                    : "bg-white-200 text-black-600 mx-2"
                }`}
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                <span className="page-link">{i + 1}</span>
              </li>
            ))}
            {currentPageIndex < pagesCount - 1 && (
              <li
                className="flex items-center justify-center"
                onClick={() => setCurrentPage(currentPageIndex + 2)}
              >
                <span className="text-xs dark:text-white-100">Next</span>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
