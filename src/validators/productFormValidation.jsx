export const productFormValidation = (productInfo, errors, setErrors) => {
  const newErrors = { ...errors };
  let errorText = "This field cannot be empty.";
  // Validate each field and update errors
  if (productInfo?.name.length == 0) {
    newErrors.name = errorText;
  } else {
    newErrors.name = "";
  }

  if (productInfo.categoryId == 0) {
    newErrors.categoryId = errorText;
  } else {
    newErrors.categoryId = "";
  }

  if (productInfo.brandId == "") {
    newErrors.brandId = errorText;
  } else {
    newErrors.brandId = "";
  }

  if (productInfo.code.length == 0) {
    newErrors.code = "Code cannot be empty";
  } else {
    newErrors.code = "";
  }

  if (productInfo.shortDescription.length == 0) {
    newErrors.shortDescription = errorText;
  } else {
    newErrors.shortDescription = "";
  }

  if (productInfo.description.length == 0) {
    newErrors.description = errorText;
  } else {
    newErrors.description = "";
  }

  setErrors(newErrors);
};
