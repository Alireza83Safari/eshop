import React from "react";

export default function Input({
  className,
  name,
  placeholder,
  value,
  onChange,
  type,
  labelText,
  Error,
  callback,
}) {
  return (
    <>
      <label
        htmlFor="name"
        className="block text-gray-800 dark:text-white-100 font-medium"
      >
        {labelText}
      </label>
      <input
        type={type?.length > 1 ? type : "text"}
        placeholder={placeholder}
        name={name}
        className={`border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200 dark:text-white-100 placeholder:text-sm placeholder:text-black-900 dark:placeholder:text-white-100 ${className}`}
        value={value}
        onChange={onChange}
        onFocus={callback}
      />
      <p className="text-sm text-red-700">{Error}</p>
    </>
  );
}
