import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/userInterceptors";
import Spinner from "./Spinner/Spinner";
import Header from "../pages/Header/Header";
import Footer from "../pages/Footer";
import { ToastContainer, toast } from "react-toastify";
const ProductsTemplate = lazy(() => import("./ProductsTemplate"));

export default function SearchResults() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await instance.get(
          `/product?searchTerm=${searchTerm}`
        );

        setSearchResults(response?.data?.data);
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const BasketHandler = (cartID) => {
    let userBasketHandler = {
      productItemId: cartID.itemId,
      quantity: 1,
    };

    instance.post("/orderItem", userBasketHandler).then((res) => {
      if (res.status === 200) {
        toast.success(`${cartID.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    });
  };

  return (
    <>
      <Header />
      <section className="min-h-screen">
        {searchResults.length ? (
          <div className="relative grid grid-cols-3 mt-5 pb-14">
            {searchResults?.map((product) => (
              <div className="relative grid lg:grid-cols-3 sm:grid-cols-2 col-span-12 mt-5 pb-14">
                <Suspense fallback={<Spinner />}>
                  <ProductsTemplate
                    product={product}
                    basketHandler={BasketHandler}
                  />
                </Suspense>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-32">
            <div>
              <img
                src="https://www.digikala.com/statics/img/svg/plp/not-found.svg"
                alt=""
              />
              <p className="text-center mt-8 text-lg font-bold">
                Product Not Found
              </p>
            </div>
          </div>
        )}
        <ToastContainer />
      </section>

      <Footer />
    </>
  );
}
