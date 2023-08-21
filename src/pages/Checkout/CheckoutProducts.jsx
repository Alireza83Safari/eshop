import React, { Suspense, lazy } from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../components/Spinner/Spinner";
import instance from "../../api/axios-interceptors";

const ProductTemplate = lazy(() => import("./ProductTemplate"));
const CheckoutEmpty = lazy(() => import("./CheckoutEmpty"));

export default function CheckoutProducts({ orders, fetchData }) {
  const handleIncrement = (productId) => {
    changeIncrementQuantity(productId.productItemId, productId.id);
  };

  const handleDecrement = (productId) => {
    changeDecrementQuantity(productId.productItemId, productId.id);
  };

  const removeProductHandler = async (id) => {
    try {
      const response = await instance.post(
        `/api/v1/user/orderItem/delete/${id}`
      );
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting the product:", error.message);
    }
  };

  const changeIncrementQuantity = async (itemId, id) => {
    let newQuantity =
      orders?.items.find((order) => order.id === id).quantity + 1;
    let productData = { productItemId: itemId, quantity: newQuantity };
    try {
      const response = await instance.post("/api/v1/orderItem", productData);
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log("Error updating quantity:", error.message);
    }
  };

  const changeDecrementQuantity = async (itemId, id) => {
    let newQuantity =
      orders?.items.find((order) => order.id === id).quantity - 1;
    let productData = { productItemId: itemId, quantity: newQuantity };
    try {
      const response = await instance.post("/api/v1/orderItem", productData);

      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log("Error updating quantity:", error.message);
    }
  };
  return (
    <>
      <div className="flex items-center px-4 py-2 border-t border-x text-black-900 dark:text-white-100">
        <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
        <p className="ml-2 text-lg">Shopping Cart</p>
      </div>

      <div className="border md:px-5 xl:w-[50rem] lg:w-[40rem] w-[90vw]">
        {!orders?.items.length ? (
          <Suspense fallback={<Spinner />}>
            <CheckoutEmpty />
          </Suspense>
        ) : (
          <>
            {orders?.items?.map((order) => (
              <Suspense fallback={<Spinner />}>
                <ProductTemplate
                  order={order}
                  handleIncrement={handleIncrement}
                  handleDecremen={handleDecrement}
                  removeProductHandler={removeProductHandler}
                />
              </Suspense>
            ))}
          </>
        )}
      </div>
    </>
  );
}
