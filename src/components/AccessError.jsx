import React from "react";

export default function AccessError({ error, onClose }) {
  return (
    <div
      className="h-full w-full flex justify-center items-center m-auto"
      onClick={onClose}
    >
      <h1 className="text-3xl font-bold">You Havent Access {error}</h1>
    </div>
  );
}
