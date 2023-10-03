export const loginValidation = (loginInfos, errors, setErrors) => {
  const newErrors = { ...errors };

  switch (true) {
    case loginInfos?.username.length === 0:
      newErrors.username = "Username cannot be empty";
      break;
    case loginInfos?.username.length < 2:
      newErrors.username = "Minimum character length is 3";
      break;
    default:
      newErrors.username = "";
      break;
  }

  switch (true) {
    case loginInfos?.password.length === 0:
      newErrors.password = "Password cannot be empty";
      break;
    case loginInfos?.password.length < 7:
      newErrors.password = "Minimum character length is 8";
      break;
    default:
      newErrors.password = "";
      break;
  }

  setErrors(newErrors);
};
