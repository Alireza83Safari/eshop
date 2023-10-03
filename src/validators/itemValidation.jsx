export const itemValidation = (productItemInfo, errors, setErrors) => {
  const newErrors = { ...errors };
  const errorText = "This field cannot be empty.";
  switch (true) {
    case productItemInfo?.status.length === 0:
      newErrors.status = errorText;
      break;
    default:
      newErrors.status = "";
  }

  switch (true) {
    case productItemInfo.price.length === 0:
      newErrors.price = errorText;
      break;
    default:
      newErrors.price = "";
  }

  switch (true) {
    case productItemInfo.colorId.length === 0:
      newErrors.colorId = errorText;
      break;
    default:
      newErrors.colorId = "";
  }

  switch (true) {
    case productItemInfo.quantity.length === 0:
      newErrors.quantity = errorText;
      break;
    default:
      newErrors.quantity = "";
  }

  setErrors(newErrors);
};
