import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import useBanner from "../../api/banner/user/useBanner";

export default function Banner() {
  const [filteredBanner, setilteredBanner] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { banners, bannersLoading } = useBanner();

  useEffect(() => {
    if (!!banners?.length) {
      setilteredBanner(banners?.filter((appPic) => appPic?.appPicType === 0));
    }
  }, [banners]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === filteredBanner?.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, filteredBanner]);

  return (
    <section className="mt-32">
      {!!filteredBanner?.length ? (
        <div className="grid sm:grid-cols-2 w-full xl:px-8 px-5 md:mt-0 mt-16">
          {bannersLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="my-auto sm:order-1 order-2">
                <div className="text-black-900 dark:text-white-100">
                  <h1
                    className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-black sm:text-start text-center sm:mt-0 mt-14"
                    style={{ lineHeight: "80px" }}
                  >
                    {filteredBanner[currentIndex] &&
                      filteredBanner[currentIndex]?.title}
                  </h1>
                </div>
                <div className="sm:my-16 my-10"></div>

                <div className="sm:block flex justify-center">
                  <Link
                    to={
                      filteredBanner[currentIndex] &&
                      filteredBanner[currentIndex]?.url
                    }
                    className="xl:py-4 mb-4 xl:px-14 md:py-3 md:px-10 py-2 px-16 bg-blue-600 text-white-100 rounded-md sm:inline flex justify-center"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center container order-1">
                <img
                  src={
                    filteredBanner[currentIndex] &&
                    filteredBanner[currentIndex]?.fileUrl
                  }
                  className="max-w-[16rem] xl:max-w-[20rem] object-cover"
                  alt={`Slide ${currentIndex}`}
                />
              </div>
            </>
          )}
        </div>
      ) : null}
    </section>
  );
}
