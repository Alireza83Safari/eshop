import React, { useEffect, useState } from "react";
import TopbarItem from "./TopbarItem";

export default function Topbar() {
  const [topbarData, setTopbarData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/topbar/")
      .then((res) => res.json())
      .then((products) => {
        setTopbarData(products);
      });
  }, []);

  return (
    <>
      {topbarData.map((data, index) => (
        <TopbarItem
          key={data.title}
          data={data}
          isLast={index === topbarData.length - 1}
        />
      ))}
    </>
  );
}
