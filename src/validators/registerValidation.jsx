export const registerValidation = (registerInfos, errors, setErrors) => {
  const newErrors = { ...errors };

  if (registerInfos?.username.length == 0) {
    newErrors.username = "username cannot be empty";
  } else if (registerInfos?.username.length < 3) {
    newErrors.username = "minimum character is 3";
  } else {
    newErrors.username = "";
  }

  if (registerInfos.password.length == 0) {
    newErrors.password = "password cannot be empty";
  } else if (registerInfos?.password.length < 8) {
    newErrors.password = "minimum character is 8";
  } else {
    newErrors.password = "";
  }

  if (registerInfos.passwordConfirmation.length == 0) {
    newErrors.passwordConfirmation = "password cannot be empty";
  } else if (registerInfos?.passwordConfirmation.length < 8) {
    newErrors.passwordConfirmation = "minimum character is 8";
  } else {
    newErrors.passwordConfirmation = "";
  }

  setErrors(newErrors);
};
