import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/axios-interceptors";
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
          `/api/v1/user/product?searchTerm=${searchTerm}`
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

    instance.post("/api/v1/user/orderItem", userBasketHandler).then((res) => {
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
      <section>
        {searchResults.length ? (
          <div className="relative grid grid-cols-3 mt-5 pb-14">
            {searchResults?.map((product) => (
              <Suspense fallback={<Spinner />}>
                <ProductsTemplate
                  product={product}
                  basketHandler={BasketHandler}
                />
              </Suspense>
            ))}
          </div>
        ) : (
          <p>not found anything</p>
        )}
        <ToastContainer />
      </section>

      <Footer />
    </>
  );
}
