import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function Description() {
  const { productID } = useParams();
  const {
    datas: getDesc,
    fetchData: fetchDesc,
    isLoading,
  } = useFetch(`/api/v1/user/product/${productID}`);

  useEffect(() => {
    fetchDesc();
  }, []);
  return (
    <div className="border p-4 mb-20">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h3>Product Full Description</h3>
          <p className="text-gray-800 text-xs leading-5 mt-4">
            {getDesc?.description}
          </p>
        </>
      )}
    </div>
  );
}
