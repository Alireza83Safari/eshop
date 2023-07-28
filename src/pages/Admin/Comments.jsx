import React, { useContext, useEffect, useState } from "react";
import CommentsInfos from "../../components/Admin/CommentsInfos";
import CommentsTable from "../../components/Admin/CommentsTable";
import productsContext from "../../Context/productsContext";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Paganation";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const { isLoading, setLoading } = useContext(productsContext);

  const pageSize = 8;
  const totalPage = Math.ceil(comments.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setPaginatedProducts(comments.slice(startIndex, endIndex));
  }, [currentPage, comments]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:9000/comments/");
        const commentData = await response.json();
        setComments(commentData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [isLoading]);

  const totalComments = comments.length;
  const totalAccept = comments.filter(
    (comment) => comment.status === "accept"
  ).length;
  const totalReject = comments.filter(
    (comment) => comment.status === "reject"
  ).length;

  return (
    <section className="float-right mt-16 pt-4 px-6 md:pb-16 bg-white-200 dark:text-white-100 min-h-screen dark:bg-black-600 lg:w-[87%] w-[93%] flex">
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <Spinner />
        </div>
      ) : (
        <div className="md:grid grid-cols-12">
          <div className="md:col-span-9 mt-2 text-center">
            <p className="text-md 2xl:text-xl font-bold border-b py-2 w-full bg-white-100 rounded-t-xl dark:bg-black-200">
              Comments
            </p>
            <div className="relative lg:px-3 overflow-y-auto bg-white-100 rounded-b-xl dark:bg-black-200">
              <div className="h-[27.4rem]">
                <CommentsTable paginatedProducts={paginatedProducts} />
              </div>

              <Pagination
                pageNumber={pageNumber}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>

          <div className="md:col-span-3 md:block grid grid-cols-3 md:px-4 md:py-">
            <CommentsInfos
              totalComments={totalComments}
              totalAccept={totalAccept}
              totalReject={totalReject}
            />
          </div>
        </div>
      )}
    </section>
  );
}
