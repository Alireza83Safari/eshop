import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import instance from "../../api/userInterceptors";
import { ToastContainer, toast } from "react-toastify";

export default function ProductContent({ findProduct }) {
  const handleAddToCart = () => {
    const productData = {
      productItemId: findProduct.itemId,
      quantity: 1,
    };

    instance.post("/orderItem", productData).then((res) => {
      if (res.status === 200) {
        toast.success(`${findProduct.name} added to favorite!`, {
          position: "bottom-right",
        });
      } else if (res.status === 400) {
        toast.success(`${findProduct.name} Previously added product`, {
          position: "bottom-right",
          type: "warning",
        });
      }
    });
  };

  const addToFavorite = (itemID) => {
    const productData = {
      productItemId: itemID,
    };

    instance
      .post("/favoriteProductItem", productData)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`${findProduct?.name} added to favorite!`, {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        if (err.response.status) {
          toast.error(`Previously added product`, {
            position: "bottom-right",
          });
        }
      });
  };

  return (
    <>
      <div className="text-black-900 dark:text-white-100 pr-4">
        <div className="flex justify-between my-3">
          <h1 className="sm:text-2xl text-lg 0 font-bold">
            {findProduct?.name}
          </h1>
          <img
            src="/images/heart-red-svgrepo-com.svg"
            className="w-6 h-6 text-red-700 hover:text-red-300 mr-10 text-2xl"
            onClick={() => addToFavorite(findProduct?.itemId)}
          />
        </div>
        <div className="md:flex grid grid-cols-2 sm:py-4 py-6 sm:text-sm text-xs  my-3">
          <div className="sm:mr-8">
            <FontAwesomeIcon icon={faStar} className="text-green-300" />
            <FontAwesomeIcon icon={faStar} className="text-green-300" />
            <FontAwesomeIcon icon={faStar} className="text-green-300" />
            <FontAwesomeIcon icon={faStar} className="text-green-300" />
            <FontAwesomeIcon icon={faStar} className="text-gray-100" />
          </div>
          <p className="sm:text-sm text-xs">
            (<span className="text-green-300 mx-1">1</span>) Review | Add Review
          </p>
        </div>
        <div className="text-sm">
          <div className="md:flex grid grid-cols-2  my-3">
            <p className="py-2 mr-20 sm:text-sm text-xs">
              Category :
              <Link to="electronics">{findProduct?.categoryName}</Link>
            </p>
            <p className="py-2 sm:text-sm text-xs">
              Status :
              <span className=" text-green-300 font-bold">Published</span>
            </p>
          </div>

          <div className="mb-4 flex sm:text-sm text-xs sm:py-2 py-6 my-3">
            <p>Color:</p>
            <div className="mt-2 flex">
              <div className="bg-green-300 mx-1 w-10 h-10 rounded-full"></div>
              <div className="bg-red-700 mx-1 w-10 h-10 rounded-full"></div>
              <div className="bg-blue-600 mx-1 w-10 h-10 rounded-full"></div>
              <div className="bg-white-100 border mx-1 w-10 h-10 rounded-full"></div>
            </div>
          </div>

          <p className="py-2 whitespace-break-spaces sm:text-sm text-xs my-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam. fringilla viverra.
          </p>
        </div>

        <h3 className="pb-6 sm:text-sm text-xs sm:py-4 py-6 my-3">
          Total Price:
          <span className="text-lg ml-4 font-bold text-red-700">
            {findProduct?.price}$
          </span>
        </h3>

        <button
          className="bg-blue-60 relative bg-blue-600 hover:bg-blue-300 duration-300 text-white-100 px-8 py-2 text-sm rounded-lg mt-3"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
      <ToastContainer />
    </>
  );
}