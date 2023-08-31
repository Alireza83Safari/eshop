export const addressValidation = (addressInfos, errors, setErrors) => {
  const newErrors = { ...errors };

  if (addressInfos.address == "") {
    newErrors.address = "address cannot be empty";
  } else if (addressInfos?.address.length < 8) {
    newErrors.address = "minimum character is 8";
  } else {
    newErrors.address = "";
  }

  if (addressInfos.firstName.length == 0) {
    newErrors.firstName = "firstName cannot be empty";
  } else {
    newErrors.firstName = "";
  }

  if (addressInfos.lastName.length == 0) {
    newErrors.lastName = "lastName cannot be empty";
  } else {
    newErrors.lastName = "";
  }

  if (addressInfos.nationalCode.length == 0) {
    newErrors.nationalCode = "nationalCode cannot be empty";
  } else {
    newErrors.nationalCode = "";
  }

  if (addressInfos.phoneNumber.length == 0) {
    newErrors.phoneNumber = "phoneNumber cannot be empty";
  }
  if (addressInfos.phoneNumber.length < 9) {
    newErrors.phoneNumber = "phone number format";
  } else {
    newErrors.phoneNumber = "";
  }

  if (addressInfos.plaque.length == 0 && !0) {
    newErrors.plaque = "plaque cannot be empty";
  } else {
    newErrors.plaque = "";
  }

  if (addressInfos.postalCode.length <= 0) {
    newErrors.postalCode = "postalCode cannot be empty";
  } else {
    newErrors.postalCode = "";
  }

  setErrors(newErrors);
};
