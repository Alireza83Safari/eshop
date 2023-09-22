import React, { useMemo } from "react";
import Select from "react-select";

const globalCustomStyles = (theme) => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid #2762EB" : "1px solid #C7C7D1",
    borderRadius: "8px",
    padding: "2px px 2px 3px",
    backgroundColor: theme === "dark" ? "#2E2C3A" : "#FFFFFF",
    boxShadow: "none",
    color: theme === "dark" ? "#FFFFFF" : "#2E2C3A",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px",
    color: theme === "dark" ? "#FFFFFF" : "#2E2C3A",
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: theme === "dark" ? "#2E2C3A" : "#FFFFFF",
    color: theme === "dark" ? "#FFFFFF" : "#2E2C3A",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: theme === "dark" ? "#FFFFFF" : "#2E2C3A",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: theme === "dark" ? "#FFFFFF" : "#2E2C3A",
  }),
});

export function CustomSelect({
  options,
  onchange,
  placeholder,
  type,
  name,
  defaultValue,
}) {
  const theme = useMemo(() => {
    return localStorage.getItem("theme"); // You need to return the value
  }, []);
  const styles = useMemo(() => {
    return globalCustomStyles(theme); // You need to return the value
  }, [theme]);
  const isMulti = type === "multiple";
  return (
    <Select
      options={options}
      styles={styles}
      onChange={onchange}
      placeholder={placeholder}
      isSearchable={true}
      name={name}
      value={defaultValue}
      isMulti={isMulti}
    />
  );
}
