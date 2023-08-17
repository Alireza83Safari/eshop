import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import useFetch from "../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import instance from "../api/axios-interceptors";

export default function Comments() {
  const [strengths, setStrengths] = useState([]);
  const [strengthValue, setStrengthValue] = useState("");
  const [commentValue, setCommentValue] = useState(null);
  const [rate, setRate] = useState(null);
  const [weakPonits, setWeakPonits] = useState([]);
  const [weakPonitsValue, setWeakPonitsValue] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const { productID } = useParams();

  const {
    datas: getComments,
    fetchData: fetchComments,
    isLoading: commentIsLoading,
  } = useFetch(`/api/v1/user/comment/product/${productID}`);

  console.log(getComments?.data);

  const addNewStrength = (e) => {
    e.preventDefault();
    setStrengths([...strengths, strengthValue]);
    setStrengthValue("");
  };

  const addNewWeakPoints = (e) => {
    e.preventDefault();
    setWeakPonits([...weakPonits, weakPonitsValue]);
    setWeakPonitsValue("");
  };

  const deleteWeakpoint = (ID) => {
    let filterWeakpoin = weakPonits.filter((weakpoint) => weakpoint.id !== ID);
    setWeakPonits(filterWeakpoin);
  };

  const deleteStrength = (ID) => {
    let filterStrength = strengths.filter((strength) => strength.id !== ID);
    setStrengths(filterStrength);
  };
  const addCommentHandler = async (e) => {
    const commentObj = {
      productId: productID,
      rate: Number(rate),
      strengthPoints: strengths,
      text: commentValue,
      weakPonits: weakPonits,
    };

    e.preventDefault();

    instance
      .post("/api/v1/user/comment", commentObj)
      .then((res) => {
        if (res.status === 200) {
          fetchComments();
        }
      })
      .catch((res) => console.log(res));

    toast.success(`comment is added`, {
      position: "bottom-right",
    });

    setRate("");
    setCommentValue("");
    setStrengthValue("");
    setWeakPonitsValue("");
    setWeakPonits([]);
    setStrengths([]);
  };

  useEffect(() => {
    if (!commentValue || !rate || !strengths.length || !weakPonits) {
      setIsCommentEmpty(true);
    } else {
      setIsCommentEmpty(false);
    }
  }, [commentValue, strengths, weakPonits]);

  return (
    <div className="border p-4 mb-20 bg-white-300">
      <>
        {getComments?.data.length > 0 ? (
          getComments?.data.map((comment, index) => (
            <div className="w-[80%] m-auto py-4 border-b" key={index}>
              <div className="flex justify-between">
                <div className="flex">
                  <p className="mr-4">Username:</p>
                  <p>{comment.username}</p>
                </div>
                <p>{comment.updatedAt.slice(0, 10)}</p>
                <div className="flex">
                  <p className="mr-2">rate:</p>
                  <p className="text-green-300 font-black"> {comment.rate}</p>
                </div>
              </div>
              <div className="my-7 text-sm">
                <p>{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl text-center w-full bg-gray-200 mt-10">
            Be the first to comment.
          </div>
        )}
        <div className="mt-20 px-12">
          <h3 className="text-lg font-semibold mb-2">Add Comment and Rating</h3>
          <p className="text-sm text-gray-600 mb-4">
            Please read the rules and regulations before writing your opinion
            about this product.
          </p>

          <form>
            <textarea
              name="comment"
              value={commentValue}
              id="comment"
              cols="30"
              rows="3"
              className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Write your comment..."
              onChange={(e) => setCommentValue(e.target.value)}
            ></textarea>

            <fieldset className="mb-2">
              <legend className="text-sm text-gray-600">
                Rate this product:
              </legend>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="mr-2">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      className="focus:ring-blue-500 mx-1"
                      onChange={(e) => setRate(e.target.value)}
                    />
                    {rating}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="flex">
              <div className="w-1/2">
                <div className="mt-4">
                  <label className="block text-sm text-gray-600">
                    Strengths:
                  </label>
                  <div className="flex items-center bg-white p-2 rounded-lg border bg-white-100">
                    <button className="text-2xl text-primary mr-2">
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={addNewStrength}
                        className="text-green-300"
                      />
                    </button>

                    <input
                      type="text"
                      value={strengthValue}
                      placeholder="Strengths"
                      className="py-1 outline-none w-full"
                      onChange={(e) => setStrengthValue(e.target.value)}
                    />
                  </div>
                </div>

                <ul className="p-1">
                  {strengths?.map((strength) => (
                    <li className="flex justify-between px-2">
                      <div>
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="text-green-300 mr-2"
                        />

                        {strength}
                      </div>
                      <button onClick={() => deleteStrength(strength.index)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="mr-2 text-red-700"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-1/2 mt-4">
                <div>
                  <label className="block text-sm text-gray-600">
                    WeakPonits:
                  </label>
                  <div className="flex items-center bg-white p-2 rounded-lg border bg-white-100">
                    <button className="text-2xl text-primary mr-2">
                      <FontAwesomeIcon
                        icon={faMinus}
                        onClick={addNewWeakPoints}
                        className="text-red-700"
                      />
                    </button>

                    <input
                      type="text"
                      placeholder="WeakPonits"
                      className="py-1 outline-none w-full"
                      value={weakPonitsValue}
                      onChange={(e) => setWeakPonitsValue(e.target.value)}
                    />
                  </div>
                </div>

                <ul className="p-1">
                  {weakPonits?.map((weakpoint) => (
                    <li
                      className="flex justify-between px-2"
                      key={weakpoint.index}
                    >
                      <div>
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="text-red-700 mr-2"
                        />

                        {weakpoint}
                      </div>
                      <button
                        onClick={() => deleteWeakpoint(weakpoint.index)}
                        className="mr-2 text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className="bg-blue-500 bg-blue-600 disabled:bg-gray-200 text-white-100  duration-300 font-semibold py-2 px-4 mt-4 rounded-md focus:outline-none"
              onClick={addCommentHandler}
              disabled={isCommentEmpty}
            >
              Add Comment
            </button>
          </form>
        </div>
      </>

      <ToastContainer />
    </div>
  );
}
