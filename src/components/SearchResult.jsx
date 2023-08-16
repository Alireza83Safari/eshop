import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/axios-interceptors";
import Spinner from "./Spinner/Spinner";
import Header from "../pages/Header/Header";
import Footer from "../pages/Footer";
const ProductsTemplate = lazy(() => import("./ProductsTemplate"));

export default function SearchResults() {
  const { searchTerm } = useParams(); // Access the search query from the URL
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await instance.get(
          `/api/v1/user/product?searchTerm=${searchTerm}`
        );
        console.log(response.data.data);
        setSearchResults(response?.data?.data);
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const BasketHandler = (cartID) => {
    /*       const valueAtIndex0 = productItem && productItem[0]?.id;
    
        setProductId(cartID);
        let userBasketHandler = {
          productItemId: valueAtIndex0,
          quantity: 1,
        };
        
        doPost("/api/v1/user/orderItem", userBasketHandler, {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
    
        const productToAdd = getProducts.find((product) => product.id === cartID);
    
        toast.success(`${productToAdd.name} added to cart!`, {
          position: "bottom-right",
        }); */
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
      </section>
      <Footer />
    </>
  );
}
