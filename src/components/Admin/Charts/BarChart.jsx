import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ datas }) => {
  return (
    <ResponsiveContainer>
      <BarChart data={datas}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="value" fill="#2762EB" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
