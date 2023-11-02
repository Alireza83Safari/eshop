import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

function AddComment({ fetchComments, productId }) {
  const [strengths, setStrengths] = useState([]);
  const [strengthValue, setStrengthValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [rate, setRate] = useState(null);
  const [weakPoints, setWeakPoints] = useState([]);
  const [weakPointsValue, setWeakPointsValue] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(true);

  const addNewStrength = useCallback(
    (e) => {
      e.preventDefault();
      setStrengths([...strengths, strengthValue]);
      setStrengthValue("");
    },
    [strengths, strengthValue]
  );

  const addNewWeakPoints = useCallback(
    (e) => {
      e.preventDefault();
      setWeakPoints([...weakPoints, weakPointsValue]);
      setWeakPointsValue("");
    },
    [weakPoints, weakPointsValue]
  );

  const deleteWeakPoint = (index) => {
    const updatedWeakPoints = weakPoints.filter((_, i) => i !== index);
    setWeakPoints(updatedWeakPoints);
  };

  const deleteStrength = (index) => {
    const updatedStrengths = strengths.filter((_, i) => i !== index);
    setStrengths(updatedStrengths);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();

    const commentObj = {
      productId: productId,
      rate: Number(rate),
      strengthPoints: strengths,
      text: commentValue,
      weakPoints: weakPoints,
    };

    try {
      await userAxios.post("/comment", commentObj).then((res) => {
        if (res.status === 200) {
          toast.success("add comment is success");
          fetchComments();
          setRate("");
          setCommentValue("");
          setStrengths([]);
          setWeakPoints([]);
          setIsCommentEmpty(true);
        }
      });
    } catch (error) {}
  };
  const commentRating = [1, 2, 3, 4, 5];
  useEffect(() => {
    setIsCommentEmpty(!commentValue || !rate);
  }, [commentValue, rate, strengths, weakPoints]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <textarea
        name="comment"
        value={commentValue}
        id="comment"
        cols="30"
        rows="3"
        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-black-200 text-sm"
        placeholder="Write your comment..."
        onChange={(e) => setCommentValue(e.target.value)}
      ></textarea>

      <fieldset className="mb-2">
        <legend className="text-sm text-gray-600">Rate this product:</legend>
        <div className="flex items-center text-sm">
          {commentRating.map((rating, index) => (
            <label key={index} className="mr-2">
              <input
                type="radio"
                name="rating"
                className="focus:ring-blue-500 mx-1"
                checked={rating === rate}
                onChange={() => setRate(rating)}
              />

              {rating}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex">
        <div className="w-1/2">
          <div className="mt-4">
            <label className="block text-sm text-gray-600">Strengths:</label>
            <div className="flex items-center bg-white p-2 rounded-lg border bg-white-100 dark:bg-black-200 mr-2">
              <button className="md:text-2xl text-lg text-primary mr-2 ">
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
                className="md:py-1 text-sm outline-none w-full dark:bg-black-200"
                onChange={(e) => setStrengthValue(e.target.value)}
              />
            </div>
          </div>

          <ul className="p-1">
            {strengths.map((strength, index) => (
              <li className="flex justify-between px-2 text-sm" key={index}>
                <div>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-green-300 mr-2"
                  />
                  {strength}
                </div>
                <button onClick={() => deleteStrength(index)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mr-2 text-red-700 md:text-base text-sm"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 mt-4">
          <div>
            <label className="block text-sm text-gray-600">WeakPoints:</label>
            <div className="flex items-center bg-white p-2 rounded-lg border bg-white-100 dark:bg-black-200 ml-2">
              <button className="text-2xl text-primary mr-2">
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={addNewWeakPoints}
                  className="text-red-700"
                />
              </button>

              <input
                type="text"
                placeholder="WeakPoints"
                className="md:py-1 text-sm outline-none w-full dark:bg-black-200"
                value={weakPointsValue}
                onChange={(e) => setWeakPointsValue(e.target.value)}
              />
            </div>
          </div>

          <ul className="p-1">
            {weakPoints.map((weakpoint, index) => (
              <li className="flex justify-between px-2 text-sm" key={index}>
                <div>
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="text-red-700 mr-2"
                  />
                  {weakpoint}
                </div>
                <button
                  onClick={() => deleteWeakPoint(index)}
                  className="mr-2 text-red-700 md:text-base text-sm"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className={` bg-blue-500 text-white font-semibold md:py-2 py-1 md:px-4 px-2 md:text-base text-sm mt-4 rounded-md focus:outline-none text-white-100 ${
          isCommentEmpty ? "bg-gray-200 cursor-not-allowed" : "bg-blue-600"
        }`}
        onClick={addCommentHandler}
        disabled={isCommentEmpty}
      >
        Add Comment
      </button>
    </form>
  );
}
export default React.memo(AddComment);
