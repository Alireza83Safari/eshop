export const productFormValidation = (productInfo, errors, setErrors) => {
  const newErrors = { ...errors };

  // Validate each field and update errors
  if (productInfo?.name.length == 0) {
    newErrors.name = "Name cannot be empty";
  } else {
    newErrors.name = "";
  }

  if (productInfo.categoryId == 0) {
    newErrors.categoryId = "Category cannot be empty";
  } else {
    newErrors.categoryId = "";
  }

  if (productInfo.brandId == "") {
    newErrors.brandId = "Brand cannot be empty";
  } else {
    newErrors.brandId = "";
  }

  if (productInfo.code.length == 0) {
    newErrors.code = "Code cannot be empty";
  } else {
    newErrors.code = "";
  }

  if (productInfo.shortDescription.length == 0) {
    newErrors.shortDescription = "Short Description cannot be empty";
  } else {
    newErrors.shortDescription = "";
  }

  if (productInfo.description.length == 0) {
    newErrors.description = "Description cannot be empty";
  } else {
    newErrors.description = "";
  }

  setErrors(newErrors);
};
