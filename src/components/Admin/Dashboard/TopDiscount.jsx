import React, { useEffect, useState, lazy, Suspense } from "react";
import userAxios from "../../../services/Axios/userInterceptors";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
const Infos = lazy(() => import("../Infos/Infos"));

const TopDiscount = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { datas: product, isLoading: productLoading } = useFetch(
    "/product?order=discount",
    userAxios
  );
  const topDiscount = product?.data && product?.data[0];

  const [isLoading, setLoading] = useState(false);
  const [productInfos, setProductInfos] = useState(null);
  const [productFile, setProductFile] = useState(null);

  const getProductInfo = async () => {
    setLoading(true);
    if (topDiscount?.itemId) {
      try {
        const response = await adminAxios.get(
          `/productItem/product/${topDiscount?.id}`
        );
        if (response.status === 200) {
          setProductInfos(response?.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const getProductFile = async () => {
    setLoading(true);
    const response = await userAxios.get(`/file/${topDiscount?.id}/1`);
    try {
      setLoading(false);
      setProductFile(response?.data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showInfo) {
      getProductInfo();
      getProductFile();
    }
  }, [showInfo]);
  return (
    <div className="mr-7 mt-4">
      <div className="bg-white-100 dark:bg-black-200 dark:text-white-100 py-7 px-5 ml-3 rounded-xl">
        <span className="flex justify-center font-bold whitespace-nowrap dark:text-white-100 lg:text-base text-xs text-center">
          Most Discount Product Weekly
        </span>
        <div className="pt-4 h-56 relative">
          {productLoading ? (
            <Spinner />
          ) : (
            <img
              src={`http://127.0.0.1:6060/${topDiscount?.fileUrl}`}
              className="w-full h-full object-contain"
              alt="Most Sale Product"
            />
          )}
        </div>
        <div className="flex justify-between md:px-1 px-10 xl:text-base md:text-xs text-sm mt-4">
          <p className="py-1 lg:py-0">price:{topDiscount?.price}$</p>
          <p className="py-1 lg:py-0">code: {topDiscount?.code}</p>
        </div>
        <div className="w-full">
          <button
            className="bg-blue-600 w-full rounded-lg text-white-300 lg:mt-7 mt-3 md:py-1 py-2 lg:text-base text-xs"
            onClick={() => setShowInfo(true)}
          >
            Show Details
          </button>
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        {showInfo && (
          <Infos
            setShowInfo={setShowInfo}
            isLoading={isLoading}
            productInfos={productInfos}
            productFile={productFile}
            showInfo={showInfo}
            infosId={topDiscount?.id}
          />
        )}
      </Suspense>
    </div>
  );
};

export default TopDiscount;
