export const addressValidation = (addressInfos, errors, setErrors) => {
  const newErrors = { ...errors };
  const errorText = "This field cannot be empty.";

  switch (true) {
    case addressInfos.address === "":
      newErrors.address = errorText;
      break;
    case addressInfos?.address.length < 8:
      newErrors.address = "Minimum character length is 8";
      break;
    default:
      newErrors.address = "";
  }

  switch (true) {
    case addressInfos.firstName.length === 0:
      newErrors.firstName = errorText;
      break;
    default:
      newErrors.firstName = "";
  }

  switch (true) {
    case addressInfos.lastName.length === 0:
      newErrors.lastName = "Last name cannot be empty";
      break;
    default:
      newErrors.lastName = "";
  }

  switch (true) {
    case addressInfos.nationalCode.length === 0:
      newErrors.nationalCode = errorText;
      break;
    default:
      newErrors.nationalCode = "";
  }

  switch (true) {
    case addressInfos.phoneNumber.length === 0:
      newErrors.phoneNumber = errorText;
      break;
    case addressInfos.phoneNumber.length < 9:
      newErrors.phoneNumber = "Phone number format";
      break;
    default:
      newErrors.phoneNumber = "";
  }

  switch (true) {
    case addressInfos.plaque.length === 0:
      newErrors.plaque = errorText;
      break;
    default:
      newErrors.plaque = "";
  }

  switch (true) {
    case addressInfos.postalCode.length <= 0:
      newErrors.postalCode = errorText;
      break;
    default:
      newErrors.postalCode = "";
  }

  setErrors(newErrors);
};
