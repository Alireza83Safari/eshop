import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faShieldAlt,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../components/Breadcrumb";
import productsContext from "../Context/productsContext";
import "../Style/Style.css";

export default function ProductsInfo() {
  const { getProducts, setCheckOut } = useContext(productsContext);
  const { productID } = useParams();
  let findProduct = getProducts.find((product) => product.id === productID);

  const handleAddToCart = () => {
    toast.success(`${findProduct.name} added to cart!`, {
      position: "bottom-right",
    });

    const newProduct = {
      ...findProduct,
    };

    setCheckOut((prev) => [...prev, newProduct]);
  };

  return (
    <section className="mt-24">
      <div className="grid grid-cols-12 xl:px-10 px-4">
        <div className="lg:col-span-4 md:col-span-5 col-span-12">
          <div className="md:block flex justify-center md:w-80 px-4 lg:py-10 md:py-20">
            <img
              src={findProduct.img}
              alt=""
              className="md:w-full w-7/12 object-contain"
            />
          </div>
        </div>
        <div className="lg:col-span-6 md:col-span-7 lg:pl-0 pl-8 col-span-12">
          <Breadcrumb
            links={[
              { id: 1, title: "Home", to: "shop/products" },
              {
                id: 2,
                title: "Check out",
                to: "shop/checkout",
              },
            ]}
          />
          <div className="text-black-900 dark:text-white-100">
            <h1 className="sm:text-2xl text-lg font-bold">
              {findProduct.name}
            </h1>
            <div className="sm:flex grid grid-cols-2 sm:py-4 py-6 sm:text-sm text-xs">
              <div className="sm:mr-8">
                <FontAwesomeIcon icon={faStar} className="text-green-300" />
                <FontAwesomeIcon icon={faStar} className="text-green-300" />
                <FontAwesomeIcon icon={faStar} className="text-green-300" />
                <FontAwesomeIcon icon={faStar} className="text-green-300" />
                <FontAwesomeIcon icon={faStar} className="text-gray-100" />
              </div>
              <p className="sm:text-sm text-xs">
                (<span className="text-green-300 mx-1">1</span>) Review | Add
                Review
              </p>
            </div>
            <div className="text-sm">
              <div className="sm:flex grid grid-cols-2">
                <p className="py-2 mr-20 sm:text-sm text-xs">
                  Category :<Link to="electronics">{findProduct.category}</Link>
                </p>
                <p className="py-2 sm:text-sm text-xs">
                  Status :
                  <span className=" text-green-300 font-bold">
                    {findProduct.status}
                  </span>
                </p>
              </div>

              <div className="mb-4 sm:text-sm text-xs sm:py-2 py-6">
                <p>Color:</p>
                <div className="mt-2">
                  <span className="bg-green-300 mx-1 px-4 py-1 rounded-full"></span>
                  <span className="bg-red-700 mx-1 px-4 py-1 rounded-full"></span>
                  <span className="bg-blue-600 mx-1 px-4 py-1 rounded-full"></span>
                  <span className="bg-white-100 border mx-1 px-4 py-1 rounded-full"></span>
                </div>
              </div>

              <p className="py-2 whitespace-break-spaces sm:text-sm text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam. fringilla viverra.
              </p>
            </div>

            <h3 className="pb-6 sm:text-sm text-xs sm:py-4 py-6">
              Total Price:
              <span className="text-lg ml-4 font-bold text-red-700">
                {findProduct.price}$
              </span>
            </h3>

            <button
              className="bg-blue-60 relative bg-blue-600 hover:bg-blue-300 duration-300 text-white-100 px-8 py-2 text-sm rounded-lg"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 col-span-12 lg:block sm:flex justify-between block lg:my-0 my-16 lg:px-0 px-12 text-black-900 dark:text-white-100">
          <div className="relative lg:my-5">
            <div className="flex">
              <div className="mr-4">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="block sm:text-xl text-2xl my-2 mr-2 text-blue-600"
                />
              </div>
              <div>
                <p className="sm:text-xs my-1">FREE SHIPPING</p>
                <p className="sm:text-[10px] text-sm text-gray-800">
                  Free shipping on all
                </p>
              </div>
            </div>
            <span className="sm:text-[10px] text-xs absolute top-9 text-gray-800">
              orders
            </span>
          </div>

          <div className="relative lg:my-12 sm:my-0 my-12">
            <div className="flex">
              <div className="mr-4">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="block sm:text-xl text-2xl my-2 mr-2 text-green-300"
                />
              </div>
              <div>
                <p className="sm:text-xs sm:my-1 mt-2 sm:whitespace-normal whitespace-nowrap">
                  MONEY BACK <br className="sm:flex hidden" /> GUARANTEE
                </p>
              </div>
            </div>
            <span className="sm:text-[10px] text-xs absolute top-10 text-gray-800 whitespace-nowrap">
              100% money back guarantee.
            </span>
          </div>

          <div className="relative lg:my-12 sm:my-0 my-7">
            <div className="flex">
              <div className="mr-4">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="block sm:text-xl text-2xl my-2 mr-2 text-orange-400"
                />
              </div>
              <div>
                <p className="sm:text-xs my-1">SAFE & SECURE</p>
                <p className="sm:text-[10px] text-sm text-gray-800">
                  Lorem ipsum dolor sitall
                </p>
              </div>
            </div>
            <span className="sm:text-[10px] text-xs absolute top-9 text-gray-800">
              amet
            </span>
          </div>
        </div>
      </div>
      <div className="px-8 text-black-900 dark:text-white-100">
        <div className="flex text-sm pb-5">
          <Link className="mx-2">DESCRIPTION</Link>
          <Link className="mx-2">SIZE GUIDE</Link>
          <Link className="mx-2">REVIEWS</Link>
        </div>

        <div className="border p-4 mb-20">
          <h3>Product Full Description</h3>
          <p className="text-gray-800 text-xs leading-5 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium, cumque, earum blanditiis incidunt minus commodi
            consequatur provident quae. Nihil, alias, vel consequatur ab aliquam
            aspernatur optio harum facilis excepturi mollitia autem voluptas cum
            ex veniam numquam quia repudiandae in iure. Assumenda, vel provident
            molestiae perferendis officia commodi asperiores earum sapiente
            inventore quam deleniti mollitia consequatur expedita quaerat natus
            praesentium beatae aut ipsa non ex ullam atque suscipit ut
            dignissimos magnam!
          </p>
        </div>
      </div>
      {/* <Comments /> */}
      <ToastContainer />
    </section>
  );
}
