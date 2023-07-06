import React from "react";
import DashboardChart from "./Chart";
import Topbar from "../Topbar/Topbar";
import MostViewd from "./MostViewd";
import Transactions from "./Transactions";
import MostSale from "./MostSale";

export default function Dashboard() {
  return (
    <section className="float-right mt-16 pb-10 pt-4 bg-white-200 dark:bg-black-600 w-[87%]">
      <div className="grid grid-cols-4 bg-white-100 dark:bg-black-200 dark:text-white-100 py-5 mx-7 rounded-xl mt-4">
        <Topbar />
      </div>

      <div className="grid grid-cols-10 dark:bg-black-600">
        <DashboardChart />
        <MostViewd />
        <Transactions />
        <MostSale />
      </div>
    </section>
  );
}
