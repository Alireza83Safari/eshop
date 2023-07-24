import React from "react";
import DashboardChart from "../../components/Admin/DashboardChart";
import Topbar from "../../components/Admin/Topbar";
import MostViewed from "../../components/Admin/MostViewed";
import Transactions from "../../components/Admin/Transactions";
import MostSale from "../../components/Admin/MostSale";

const Dashboard = () => {
  return (
    <section className="float-right md:mt-16 mt-12 pb-10 pt-4 bg-white-200 dark:bg-black-600 lg:w-[87%] w-[93%]">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 bg-white-100 dark:bg-black-200 dark:text-white-100 py-3 mx-7 rounded-xl mt-4">
        <Topbar />
      </div>

      <div className="grid grid-cols-10 dark:bg-black-600">
        <DashboardChart />
        <MostViewed />
        <Transactions />
        <MostSale />
      </div>
    </section>
  );
};

export default Dashboard;
