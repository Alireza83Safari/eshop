import React, { Suspense, lazy } from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../Spinner/Spinner";
import useAddCart from "../../api/order/user/useAddCart";

const ProductTemplate = lazy(() => import("./ProductTemplate"));
const CheckoutEmpty = lazy(() => import("./CheckoutEmpty"));

export default function CheckoutProducts({ orderItems }) {
  const { addToCart } = useAddCart();

  const changeProductQuantity = async (product, status) => {
    const findOrderItem = orderItems?.items?.find(
      (order) => order.id === product.id
    );

    const orderItem = {
      productItemId: product?.productItemId,
      quantity:
        status === "increment"
          ? findOrderItem?.quantity + 1
          : findOrderItem?.quantity - 1,
    };

    addToCart(orderItem);
  };

  return (
    <>
      <div className="flex items-center px-4 py-2 border-t border-x text-black-900 dark:text-white-100">
        <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
        <p className="ml-2 text-lg">Shopping Cart</p>
      </div>

      <div className="border md:px-5 xl:w-[50rem] lg:w-[40rem] w-[90vw]">
        {!orderItems?.items?.length ? (
          <Suspense fallback={<Spinner />}>
            <CheckoutEmpty />
          </Suspense>
        ) : (
          <>
            {orderItems?.items?.map((order, index) => (
              <Suspense fallback={<Spinner />} key={index}>
                <ProductTemplate
                  order={order}
                  changeProductQuantity={changeProductQuantity}
                />
              </Suspense>
            ))}
          </>
        )}
      </div>
    </>
  );
}
