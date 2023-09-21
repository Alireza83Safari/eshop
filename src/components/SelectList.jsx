import React from "react";
import Select from "react-select";

const globalCustomStyles = (theme) => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid #2762EB" : "1px solid #C7C7D1",
    borderRadius: "8px",
    padding: "2px px 2px 3px",
    boxShadow: "none",
    backgroundColor: theme === "dark" ? "2E2C3A" : "FFFFFF",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px",
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
  const theme = localStorage.getItem("theme");
  const styles = globalCustomStyles(theme);

  return (
    <>
      {type === "multiple" ? (
        <Select
          options={options}
          styles={styles}
          onChange={onchange}
          placeholder={placeholder}
          isSearchable={true}
          name={name}
          defaultValue={defaultValue}
          isMulti
        />
      ) : (
        <Select
          options={options}
          styles={styles}
          onChange={onchange}
          placeholder={placeholder}
          isSearchable={true}
          value={defaultValue}
        />
      )}
    </>
  );
}
