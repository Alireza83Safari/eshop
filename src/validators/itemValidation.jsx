export const itemValidation = (productItemInfo, errors, setErrors) => {
  const newErrors = { ...errors };

  if (productItemInfo?.status.length == 0) {
    newErrors.status = "status cannot be empty";
  } else {
    newErrors.status = "";
  }

  if (productItemInfo.price.length == 0) {
    newErrors.price = "price cannot be empty";
  } else {
    newErrors.price = "";
  }

  if (productItemInfo.colorId.length == 0) {
    newErrors.colorId = "Color cannot be empty";
  } else {
    newErrors.colorId = "";
  }

  if (productItemInfo.quantity.length == 0) {
    newErrors.quantity = "quantity cannot be empty";
  } else {
    newErrors.quantity = "";
  }

  if (productItemInfo.isMainItem.length == 0) {
    newErrors.isMainItem = "isMainItem cannot be empty";
  } else {
    newErrors.isMainItem = "";
  }
  setErrors(newErrors);
};
