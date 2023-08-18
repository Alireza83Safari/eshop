import React, { useEffect, useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BarChartComponent from "../Charts/BarChart";
import instance from "../../../api/axios-interceptors";

const dataTypeMapping = {
  hour: "Hour",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export default function DashboardChart() {
  const [chartData, setChartData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("weekly");

  useEffect(() => {
    fetchData(selectedDataType);
  }, [selectedDataType]);

  const fetchData = (dataType) => {
    instance
      .get(`/api/v1/admin/report/sellsChart?type=${dataType}`)
      .then((response) => {
        setChartData(response.data);
      });
  };

  const valueHandler = (event) => {
    const newDataType = event.target.value;
    setSelectedDataType(newDataType);
  };

  return (
    <section className="ml-7 mt-3 mr-5 md:mb-0 mb-6">
      <div className="bg-white-100 pb-10 dark:bg-black-200 py-5 rounded-xl">
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
              {Object.keys(dataTypeMapping).map((dataType) => (
                <option key={dataType} value={dataType}>
                  {dataTypeMapping[dataType]}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mx-2  text-white-100">
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
        </div>
        <div className="flex justify-center px-2 w- bg-white-100 dark:bg-black-200 container">
          <BarChartComponent datas={chartData} />
        </div>
      </div>
    </section>
  );
}
