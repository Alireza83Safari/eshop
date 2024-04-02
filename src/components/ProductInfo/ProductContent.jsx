import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useAddCart from "../../api/order/user/useAddCart";
import useAddFavorite from "../../api/favorite/user/useAddFavorite";
import useIsFavorite from "../../api/favorite/user/useIsFavorite";

export default function ProductContent({ productItem }) {
  const productAddedToCart = {
    productItemId: productItem?.id,
    quantity: 1,
  };

  const { isFavorite, isFavoriteHandler } = useIsFavorite();
  const { addToCart } = useAddCart();
  const { addToFavorite } = useAddFavorite();

  useEffect(() => {
    if (productItem) {
      isFavoriteHandler(productItem?.id);
    }
  }, [productItem]);

  return (
    <>
      <div className="text-black-900 dark:text-white-100 pr-4">
        <div className="flex justify-between my-3">
          <h1 className="sm:text-2xl text-lg 0 font-bold">
            {productItem?.productTitle}
          </h1>
          <button disabled={isFavorite}>
            <img
              src={`  ${
                isFavorite
                  ? "/images/heart-red-svgrepo-com.svg"
                  : "/images/heart-svgrepo-com.svg"
              } `}
              className="w-6 h-6 text-red-700 hover:text-red-300 mr-10 text-2xl"
              onClick={() => addToFavorite(productItem?.id)}
            />
          </button>
        </div>
        <div className="md:flex grid grid-cols-2 sm:py-4 py-6 sm:text-sm text-xs  my-3">
          <p className="sm:text-sm text-xs mr-12">Total Review Rate </p>
          <div className="">
            <FontAwesomeIcon icon={faStar} className="text-green-300" />
            <FontAwesomeIcon icon={faStar} className="text-green-300" />
            <FontAwesomeIcon icon={faStar} className="text-green-300" />
            <FontAwesomeIcon icon={faStar} className="text-green-300" />
            <FontAwesomeIcon icon={faStar} className="text-gray-100" />
          </div>
        </div>
        <div className="text-sm">
          <div className="md:flex grid grid-cols-2  my-3">
            <p className="py-2 mr-20 sm:text-sm text-xs">
              Category :{productItem?.categoryName}
            </p>
            <p className="py-2 sm:text-sm text-xs">
              Status :
              <span className=" text-green-300 font-bold">Published</span>
            </p>
          </div>

          <div className="mb-4 flex items-center sm:text-sm text-xs sm:py-2 py-6 my-3">
            <p>Color:</p>
            <div className="mt-2 flex">
              {productItem?.colors?.map((color, index) => (
                <div
                  className={` mx-1 w-10 h-10 rounded-lg`}
                  style={{ backgroundColor: color?.colorHex }}
                  key={index}
                ></div>
              ))}
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
            {productItem?.discountValue
              ? (
                  productItem?.price -
                  (productItem?.discountValue / 100) * productItem?.price
                ).toFixed(1)
              : productItem?.price}
            $
          </span>
        </h3>

        <button
          className="bg-blue-60 relative bg-blue-600 hover:bg-blue-300 duration-300 text-white-100 px-8 py-2 text-sm rounded-lg mt-3"
          onClick={() => addToCart(productAddedToCart)}
          disabled={addToCart.isLoading}
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
