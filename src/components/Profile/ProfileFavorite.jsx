import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import userAxios from "../../services/Axios/userInterceptors";
import useAddToCart from "../../hooks/useAddCart";
import useFetch from "../../hooks/useFetch";
import Spinner from "../Spinner/Spinner";
export default function ProfileFavorite() {
  const {
    datas: favoriteProducts,
    fetchData,
    isLoading: dataLoading,
  } = useFetch(`/profile/favoriteProducts`, userAxios);

  const deleteFavorite = async (ID) => {
    try {
      const response = await userAxios.post(
        `/favoriteProductItem/delete/${ID}`
      );

      if (response.status === 200) {
        fetchData();
        toast.success(`delete from favorie!`, {
          position: "bottom-right",
        });
      }
    } catch (error) {}
  };

  const { addToCart, isLoading } = useAddToCart();
  const handleAddToCart = async (product) => {
    addToCart(product?.itemId, 1, product);
  };

  return (
    <>
      {dataLoading ? (
        <Spinner />
      ) : !favoriteProducts?.data.length ? (
        <div className="w-full text-center py-24">
          <img
            src="https://www.digikala.com/statics/img/svg/favorites-list-empty.svg"
            alt=""
            className="m-auto "
          />
          <p className="text-lg font-semibold">
            Your Favorite Product Is Empty
          </p>
        </div>
      ) : (
        <div className="relative grid lg:grid-cols-2 sm:grid-cols-2 col-span-12 mt-5 pb-14">
          {favoriteProducts?.data.map((favorite) => (
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden dark:bg-black-800 hover:opacity-70 duration-300 m-2">
              <Link to={`/products/${favorite.name}`}>
                <img
                  src={`http://127.0.0.1:6060/${favorite.fileUrl}`}
                  alt="Product"
                  className="w-full lg:h-64 sm:h-56 h-72 p-4 object-contain"
                />
              </Link>
              <div className="p-6 ">
                <Link to={`/shop/products/${favorite.id}`}>
                  <div className="flex justify-between">
                    <h2 className="font-bold mb-2 xl:text-lg md:text-base text-sm whitespace-nowrap dark:text-white-100">
                      {favorite.name}
                    </h2>
                    <button
                      className={`text-gray-700 mb-4 py-1 px-1 text-xs rounded-lg ${
                        favorite.categoryName === "Electronics"
                          ? "bg-green-400 text-green-500"
                          : "bg-orange-400 text-orange-100"
                      }`}
                    >
                      {favorite.categoryName}
                    </button>
                  </div>
                </Link>
                <p className="text-gray-900 font-bold py-2 dark:text-white-100">
                  $ {favorite.price}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <button
                    className="py-2 w-2/3 bg-blue-600 text-white-100 text-sm rounded-lg hover:bg-blue-900 duration-200 transition"
                    onClick={() => {
                      handleAddToCart(favorite);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-1/3 py-2 rounded-lg border ml-2 flex justify-center items-center text-red-700"
                    onClick={() => deleteFavorite(favorite.itemId)}
                    disabled={isLoading}
                  >
                    <p className="text-sm mr-2">delete</p>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </>
  );
}
