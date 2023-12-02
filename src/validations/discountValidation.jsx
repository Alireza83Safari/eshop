export const discountValidation = (infos, errors, setErrors) => {
  const newErrors = { ...errors };
  const errorText = "This field cannot be empty.";
  switch (true) {
    case infos?.code === "":
      newErrors.code = errorText;
      break;
    default:
      newErrors.code = "";
  }

  switch (true) {
    case infos.expiresIn.length === 0:
      newErrors.expiresIn = errorText;
      break;
    default:
      newErrors.expiresIn = "";
  }

  switch (true) {
    case infos.quantity.length === 0:
      newErrors.quantity = errorText;
      break;
    default:
      newErrors.quantity = "";
  }

  switch (true) {
    case infos.type.length === 0:
      newErrors.type = errorText;
      break;
    default:
      newErrors.type = "";
  }

  switch (true) {
    case infos.value.length === 0:
      newErrors.value = errorText;
      break;
    default:
      newErrors.value = "";
  }

  setErrors(newErrors);
};
