export const discountValidation = (infos, errors, setErrors) => {
  const newErrors = { ...errors };

  if (infos?.code == "") {
    newErrors.code = "code cannot be empty";
  } else {
    newErrors.code = "";
  }

  if (infos?.expiresIn.length == 0) {
    newErrors.expiresIn = "expiresIn cannot be empty";
  } else {
    newErrors.expiresIn = "";
  }

  if (infos?.quantity.length == 0) {
    newErrors.quantity = "quantity cannot be empty";
  } else {
    newErrors.description = "";
  }

  if (infos?.type.length == 0) {
    newErrors.type = "type cannot be empty";
  } else {
    newErrors.type = "";
  }

  if (infos?.value.length == 0) {
    newErrors.value = "value cannot be empty";
  } else {
    newErrors.value = "";
  }

  setErrors(newErrors);
};
