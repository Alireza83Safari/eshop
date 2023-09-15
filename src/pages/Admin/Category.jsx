import React, { useState, useEffect } from "react";
import CategoryTable from "../../components/Admin/Category/CategoryTable";
import AddCategory from "../../components/Admin/Category/AddCategory";
import { ToastContainer } from "react-toastify";
import adminAxios from "../../services/Axios/adminInterceptors";
import TotalCategory from "../../components/Admin/Category/TotalCategory";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [totalCategoty, setTotalCategoty] = useState(null);
  const fetchCategory = async () => {
    try {
      const response = await adminAxios.get("/category");
      setCategory(response?.data?.data);
      setTotalCategoty(response?.data?.total);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="p-6 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2">
          <CategoryTable category={category} fetchCategory={fetchCategory} />
        </div>
        <div className="lg:col-span-4 col-span-12 gap-x-12 gap-y-6 grid grid-rows-3 lg:order-2 order-1">
          <TotalCategory totalCategoty={totalCategoty} />
          <AddCategory fetchCategory={fetchCategory} />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
