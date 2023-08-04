import React, { useEffect, useReducer } from "react";
import validator from "../../validators/validator";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
      };
    }
    default: {
      return state;
    }
  }
};

export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const { value, isValid } = mainInput;
  const { id, onInputHandler, sameValue } = props;

  useEffect(() => {
    onInputHandler(id, value, isValid);
  }, [value]);

  const onChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validations: props.validations,
      isValid: true,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid
            ? "border border-green-300"
            : "border border-red-700"
        }`}
        value={mainInput.value}
        onChange={onChangeHandler}
      />
    ) : (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid && sameValue
            ? "border border-green-300"
            : "border border-red-700"
        }`}
        value={mainInput.value}
        onChange={onChangeHandler}
      />
    );

  return <div>{element}</div>;
}
