import React, { Suspense, lazy, useEffect, useState } from "react";
import userAxios from "../../../services/Axios/userInterceptors";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
const Infos = lazy(() => import("../Infos/Infos"));

const TopSale = () => {
  const { datas: product, isLoading: productLoading } = useFetch(
    "/product?order=topSell",
    userAxios
  );
  const topSell = product?.data && product?.data[0];
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [productInfos, setProductInfos] = useState(null);
  const [productFile, setProductFile] = useState(null);

  const getProductInfo = async () => {
    setLoading(true);
    try {
      const response = await adminAxios.get(
        `/productItem/product/${topSell?.id}`
      );

      if (response.status === 200) {
        setProductInfos(response?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getProductFile = async () => {
    setLoading(true);
    const response = await userAxios.get(`/file/${topSell?.id}/1`);
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
    <div className="md:mr-7 mr-3 lg:mt-3 mx-3 md:mx-0 mt-2">
      <div className="bg-white-100 dark:bg-black-200 dark:text-white-100 py-7 px-5 lg:ml-3 md:ml-2 ml-0 rounded-xl">
        <span className="flex justify-center font-bold whitespace-nowrap dark:text-white-100 lg:text-base text-xs text-center">
          Most Sale Product Weekly
        </span>
        <div className="pt-4 lg:h-56 md:h-64 h-56 relative">
          {productLoading ? (
            <Spinner />
          ) : (
            <img
              src={`http://127.0.0.1:6060/${topSell?.fileUrl}`}
              className="w-full h-full object-contain"
              alt="Most Sale Product"
            />
          )}
        </div>
        <div className="flex justify-between md:px-1 px-10 xl:text-base md:text-xs text-sm mt-4">
          <p className="py-1 lg:py-0">price:{topSell?.price}$</p>
          <p className="py-1 lg:py-0">code: {topSell?.code}</p>
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
            infosId={topSell?.id}
          />
        )}
      </Suspense>
    </div>
  );
};

export default TopSale;
