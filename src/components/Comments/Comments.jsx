import React, { useEffect, useState } from "react";
import CommentsItem from "./CommentsItem";

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    productSales();
  }, []);

  const productSales = () => {
    fetch("http://localhost:9000/comments/")
      .then((res) => res.json())
      .then((comment) => {
        setComments(comment);
      });
  };

  const totalComments = comments.length;
  const totalAccept = comments.filter(
    (comment) => comment.status == "accept"
  ).length;
  const totalReject = comments.filter(
    (comment) => comment.status == "reject"
  ).length;

  return (
    <section className="float-right mt-20 pt-4 p-6 bg-white-200 dark:text-white-100 dark:bg-black-600 w-[87%] h-[90vh]">
      <div className="grid grid-cols-10 ">
        <div className="col-span-7 mt-2 text-center">
          <p className="text-md font-bold border-b py-2 w-full bg-white-100 rounded-t-xl dark:bg-black-200">
            Comments
          </p>
          <div className="container h-[72vh] px-8 overflow-y-auto bg-white-100 rounded-b-xl dark:bg-black-200">
            <table className="min-w-full">
              <thead>
                <tr className="text-xs grid grid-cols-5 border-b">
                  <th className="col-span-1 py-2">User</th>
                  <th className="col-span-1 py-2">Comment</th>
                  <th className="col-span-1 py-2">Produc</th>
                  <th className="col-span-1 py-2">Date</th>
                  <th className="col-span-1 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr
                    className="text-xs grid grid-cols-5 px-4"
                    key={comment.id}
                  >
                    <td className="col-span-1 py-2 flex items-center">
                      <img
                        src="https://lledogrupo.com/wp-content/uploads/2018/04/user-img-1.png"
                        className="w-8 h-8 mr-3"
                      />
                      <p className="text-xs font-bold">{comment.user}</p>
                    </td>

                    <td className="col-span-1 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {comment.text}
                    </td>
                    <td className="col-span-1 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {comment.product}
                    </td>
                    <td className="col-span-1 py-2">
                      {comment.date.toLocaleString()}$
                    </td>
                    <td className="col-span-1 py-2">
                      <button
                        className={`" text-[10px] font-black px-2 py-1 rounded-lg " ${
                          comment.status === "accept"
                            ? "bg-green-100 text-green-200"
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
          </div>
        </div>

        <div className="col-span-3 px-5">
          <CommentsItem
            totalComments={totalComments}
            totalAccept={totalAccept}
            totalReject={totalReject}
          />
        </div>
      </div>
    </section>
  );
}
