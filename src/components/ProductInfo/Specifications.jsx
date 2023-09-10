import React from "react";

export default function Specifications({ productItem }) {
  return (
    <section className="grid grid-cols-12 border p-4 mb-20 rounded-xl md:px-10 px-4">
      <div className="md:col-span-3 col-span-12 md:py-5 py-2 md:text-start text-center">
        Specifications
      </div>
      <div className="md:col-span-9 col-span-12 md:mt-12">
        {productItem?.features?.map((feature, index) =>
          feature?.items?.map((data, index) => (
            <div className="flex text-sm" key={index}>
              <p className=" text-gray-800 mr-12 py-5 w-3/12">{data?.key}</p>
              <p className="border-b border-gray-100  py-5 w-9/12">
                {data?.value?.length ? data?.value : ""}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
