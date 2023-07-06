import React from "react";
import "./Chart.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

export default function Charts({ datas, Width, Height }) {
  return (
    <ResponsiveContainer width={Width} height={Height}>
      <LineChart
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          bottom: 12,
        }}
        data={datas}
      >
        <XAxis
          dataKey="name"
          stroke="#dddd"
          /*  axisLine={false} */
          tickLine={false}
          tick={{ dx: -10, dy: 5, fontWeight: "bold", fill: "#333333" }}
        />
        <YAxis
          /*  axisLine={false} */
          tickLine={false}
          stroke="#dddd"
          troke="#acacac"
          tick={{ dx: -8, dy: 5, fontWeight: "bold", fill: "#333333" }}
        />
        <Line type="monotone" stroke="#563AFF" dataKey="uv" />
        <Tooltip className="chart-tooltip" />
      </LineChart>
    </ResponsiveContainer>
  );
}
