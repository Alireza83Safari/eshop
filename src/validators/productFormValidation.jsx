export const productFormValidation = (productInfo, errors, setErrors) => {
  const newErrors = { ...errors };
  const errorText = "This field cannot be empty.";

  switch (true) {
    case productInfo?.name.length === 0:
      newErrors.name = errorText;
      break;
    default:
      newErrors.name = "";
  }

  switch (true) {
    case productInfo.categoryId === 0:
      newErrors.categoryId = errorText;
      break;
    default:
      newErrors.categoryId = "";
  }

  switch (true) {
    case productInfo.brandId === "":
      newErrors.brandId = errorText;
      break;
    default:
      newErrors.brandId = "";
  }

  switch (true) {
    case productInfo?.code.length === 0:
      newErrors.code = errorText;
      break;
    default:
      newErrors.code = "";
  }

  switch (true) {
    case productInfo?.shortDescription.length === 0:
      newErrors.shortDescription = errorText;
      break;
    default:
      newErrors.shortDescription = "";
  }

  switch (true) {
    case productInfo?.description.length === 0:
      newErrors.description = errorText;
      break;
    default:
      newErrors.description = "";
  }

  setErrors(newErrors);
};
