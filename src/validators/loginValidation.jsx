export const loginValidation = (loginInfos, errors, setErrors) => {
  const newErrors = { ...errors };

  if (loginInfos?.username.length == 0) {
    newErrors.username = "username cannot be empty";
  } else if (loginInfos?.username.length < 3) {
    newErrors.username = "minimum character is 3";
  } else {
    newErrors.username = "";
  }

  if (loginInfos.password.length == 0) {
    newErrors.password = "password cannot be empty";
  } else if (loginInfos?.password.length < 6) {
    newErrors.password = "minimum character is 8";
  } else {
    newErrors.password = "";
  }

  setErrors(newErrors);
};
