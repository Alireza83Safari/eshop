import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userAxios from "./../services/Axios/userInterceptors";

export default function Banner() {
  const [banner, setBanner] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const responst = await userAxios.get("/appPic");
        setBanner(responst?.data);
      } catch (error) {}
    };

    fetchBanner();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banner?.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000);

    return () => clearInterval(timer);
  }, [currentIndex, banner]);

  return (
    <section className="mt-32">
      <div className="grid sm:grid-cols-2 w-full xl:px-20 md:mt-0 mt-16">
        <div className="my-auto sm:order-1 order-2">
          <div className="text-black-900 dark:text-white-100">
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-black sm:text-start text-center sm:mt-0 mt-14">
              {banner[currentIndex]?.title}
            </h1>
          </div>
          <p className="xl:text-lg text-base sm:my-16 my-10 text-black-900 dark:text-white-100 sm:text-start text-center">
            {banner?.description}
          </p>

          <div className="sm:block flex justify-center">
            <Link
              to={banner[currentIndex]?.url}
              className="xl:py-4 mb-4 xl:px-14 md:py-3 md:px-10 py-2 px-16 bg-blue-600 text-white-100 rounded-md sm:inline flex justify-center"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="flex justify-end items-center container order-1">
          <img
            src={`http://127.0.0.1:6060/${banner[currentIndex]?.fileUrl}`}
            className="md:w-[30rem] xl:w-[34rem] object-cover"
            alt={`Slide ${currentIndex}`}
          />
        </div>
      </div>
    </section>
  );
}
