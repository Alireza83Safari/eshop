import React, { useEffect, useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BarChartComponent from "./Charts/BarChart";

const DashboardChart = () => {
  const [salesChartWeekly, setSalesChartWeekly] = useState([]);
  const [salesChartMonthly, setSalesChartMonthly] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("weekly");

  useEffect(() => {
    fetch("http://localhost:9000/saleschartweekly")
      .then((res) => res.json())
      .then((data) => {
        setSalesChartWeekly(data);
      });

    fetch("http://localhost:9000/saleschartmonthly")
      .then((res) => res.json())
      .then((data) => {
        setSalesChartMonthly(data);
      });
  }, []);

  const valueHandler = (event) => {
    setSelectedDataType(event.target.value);
  };

  const selectedData =
    selectedDataType === "monthly" ? salesChartMonthly : salesChartWeekly;

  return (
    <div className="ml-7 mr-5 md:mb-0 mb-6">
      <div className="mt-6 bg-white-100 dark:bg-black-200 py-5 rounded-xl">
        <div className="flex justify-between px-6">
          <p className="text-xs font-bold dark:text-white-100 2xl:text-lg">
            Sales Chart
          </p>
          <div className="relative">
            <select
              className="block appearance-none w-full outline-none text-white-100 leading-tight mr-3 bg-blue-600 text-xs lg:text-xs py-2 px-3 rounded-md"
              onChange={valueHandler}
              value={selectedDataType}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mx-2  text-white-100">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:h-80 md:h-72 px-2 bg-white-100 dark:bg-black-200">
          <BarChartComponent datas={selectedData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
