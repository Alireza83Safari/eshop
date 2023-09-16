import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import adminAxios from "../../services/Axios/adminInterceptors";
import BrandTable from "../../components/Admin/Brand/BrandTable";
import TotalBrand from "../../components/Admin/Brand/TotalBrand";
import AddBrand from "../../components/Admin/Brand/AddBrand/AddBrand";

export default function Brand() {
  const [brand, setBrand] = useState([]);
  const [totalBrand, setTotalBrand] = useState(null);
  const fetchBrand = async () => {
    try {
      const response = await adminAxios.get("/brand");
      setBrand(response?.data?.data);
      setTotalBrand(response?.data?.data?.length);
    } catch (error) {}
  };
  useEffect(() => {
    fetchBrand();
  }, []);
  return (
    <section className="p-6 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2">
          <BrandTable brand={brand} fetchBrand={fetchBrand} />
        </div>
        <div className="lg:col-span-4 col-span-12 gap-x-12 gap-y-6 grid grid-rows-3 lg:order-2 order-1">
          <TotalBrand totalBrand={totalBrand} />
          <AddBrand fetchBrand={fetchBrand} />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
