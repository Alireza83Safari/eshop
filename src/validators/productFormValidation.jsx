export const productFormValidation = (productInfo, errors, setErrors) => {
  const newErrors = { ...errors };

  // Validate each field and update errors
  if (productInfo?.name.length == 0) {
    newErrors.name = "Name cannot be empty";
  } else if (productInfo?.name.length <= 3) {
    newErrors.name = "minimum character is 3";
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
  } else if (productInfo.code.length < 2) {
    newErrors.code = "minimum character is 2";
  } else {
    newErrors.code = "";
  }

  if (productInfo.shortDescription.length == 0) {
    newErrors.shortDescription = "Short Description cannot be empty";
  } else if (productInfo.shortDescription.length <= 4) {
    newErrors.shortDescription = "minimum character is 4";
  } else {
    newErrors.shortDescription = "";
  }

  if (productInfo.description.length == 0) {
    newErrors.description = "Description cannot be empty";
  } else if (productInfo.description.length <= 4) {
    newErrors.description = "minimum character is 4";
  } else {
    newErrors.description = "";
  }

  setErrors(newErrors);
};
