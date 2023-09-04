import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userAxios from "../services/Axios/userInterceptors";
import Spinner from "../components/Spinner/Spinner";
import Header from "./Header/Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./Sidebar/Sidebar";
const ProductTemplate = lazy(() =>
  import("../components/Product/ProductTemplate")
);

export default function SearchResults() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await userAxios.get(
          `/product?searchTerm=${searchTerm}`
        );

        setSearchResults(response?.data?.data);
      } catch (error) {}
    };

    fetchSearchResults();
  }, [searchTerm]);

  const BasketHandler = (cartID) => {
    let userBasketHandler = {
      productItemId: cartID.itemId,
      quantity: 1,
    };

    userAxios.post("/orderItem", userBasketHandler).then((res) => {
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
      <Sidebar />
      <section className="min-h-screen  pb-80">
        {searchResults.length ? (
          <div className="relative grid grid-cols-3 mt-5 pb-14">
            {searchResults?.map((product) => (
              <div className="relative">
                <Suspense fallback={<Spinner />}>
                  <ProductTemplate
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
