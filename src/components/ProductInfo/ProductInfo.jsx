import React, { useState, startTransition, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import adminAxios from "../../services/Axios/adminInterceptors";
import ProductFeature from "./ProductFeature";
import ProductContent from "./ProductContent";
import Description from "./Description";
import Comments from "./Comment/Comments";
import Specifications from "./Specifications";
import Spinner from "../Spinner/Spinner";
import useProductItem from "../../api/product/user/useProductItem";

export default function ProductsInfoComponents() {
  const { productID } = useParams();
  const [productItemId, setProductItemId] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [isLoading, setLoading] = useState(true);
  const { productItem, getProductItem, isPending } =
    useProductItem(productItemId);

  const findProductItemId = async () => {
    setLoading(true);
    const { data } = await adminAxios.get(
      `productItem/selectList/${productID}`
    );
    setProductItemId(data?.data[0]?.id);
    setLoading(false);
  };

  useEffect(() => {
    if (productID) {
      findProductItemId();
    }
  }, [productID]);

  useEffect(() => {
    if (productItemId) {
      getProductItem(productItemId);
    }
  }, [productItemId]);

  return (
    <section className="md:px-5 xl:px-16 px-2 xl:container mx-auto mt-24 min-h-[20rem]">
      {isLoading || isPending ? (
        <div className="pt-40 relative">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12">
            <div className="lg:col-span-4 md:col-span-5 col-span-12">
              <div className="md:block flex justify-center h-full w-full md:px-4 lg:py-10 md:py-20">
                <img
                  src={productItem?.files[0]?.fileUrl}
                  alt=""
                  className="md:w-5/6 w-3/4 object-cover md:py-0 py-5"
                />
              </div>
            </div>
            <div className="lg:col-span-6 md:col-span-7 col-span-12 md:px-0 px-8">
              <ProductContent productItem={productItem} />
            </div>

            <div className="lg:col-span-2 col-span-12 lg:block sm:flex justify-between block lg:my-0 my-16 lg:px-0 px-12 text-black-900 dark:text-white-100">
              <ProductFeature />
            </div>
          </div>
          <div className="md:px-8 px-2 lg:mt-16 md:mt-10 text-black-900 dark:text-white-100">
            <div className="flex text-sm pb-5">
              <Link
                className={` mx-2  ${
                  activeTab === "description" ? "font-bold" : ""
                }`}
                onClick={() =>
                  startTransition(() => setActiveTab("description"))
                }
              >
                Description
              </Link>
              <Link
                className={`mx-2 ${activeTab === "reviews" ? "font-bold" : ""}`}
                onClick={() => startTransition(() => setActiveTab("reviews"))}
              >
                Reviews
              </Link>
              <Link
                className={`mx-2 ${
                  activeTab === "Specifications" ? "font-bold" : ""
                }`}
                onClick={() =>
                  startTransition(() => setActiveTab("Specifications"))
                }
              >
                Specifications
              </Link>
            </div>
            {activeTab === "description" && (
              <Description productItem={productItem} />
            )}
            {activeTab === "reviews" && <Comments productId={productID} />}
            {activeTab === "Specifications" && (
              <Specifications productItem={productItem} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
