import React from "react";
import DashboardChart from "../../components/Admin/DashboardChart";
import Topbar from "../../components/Admin/Topbar";
import MostViewed from "../../components/Admin/MostViewed";
import Transactions from "../../components/Admin/Transactions";
import MostSale from "../../components/Admin/MostSale";

const Dashboard = () => {
  return (
    <section className="float-right md:mt-16 mt-12 pb-10 pt-4 bg-white-200 dark:bg-black-600 lg:w-[87%] sm:[90%]">
      <div className="grid grid-cols-12 sm:grid-cols-3 gap-7 py-3 mx-7 rounded-xl mt-4">
        <Topbar />
      </div>

      <div className="grid grid-cols-12 dark:bg-black-600">
        <div className="grid grid-rows-2 md:col-span-8 col-span-12">
          <DashboardChart />
          <Transactions />
        </div>
        <div className="grid grid-rows-2 md:col-span-4 col-span-12">
          <MostViewed />
          <MostSale />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
