import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const PiesChart = () => {
  const COLORS = ["red", "#00C49F", "#FFBB28"];
  const data = [
    { name: "Tax", value: 5443 },
    { name: "Income", value: 4354 },
    { name: "Net Profit", value: 7634 },
  ];
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend align="center" verticalAlign="bottom" iconSize={10} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PiesChart;
