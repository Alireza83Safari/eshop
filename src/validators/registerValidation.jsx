export const registerValidation = (registerInfos, errors, setErrors) => {
  const newErrors = { ...errors };
  const errorText = "This field cannot be empty.";
  switch (true) {
    case registerInfos?.username.length === 0:
      newErrors.username = errorText;
      break;
    case registerInfos?.username.length < 3:
      newErrors.username = "Minimum character length is 3";
      break;
    default:
      newErrors.username = "";
  }

  switch (true) {
    case registerInfos?.password.length === 0:
      newErrors.password = errorText;
      break;
    case registerInfos?.password.length < 7:
      newErrors.password = "Minimum character length is 8";
      break;
    default:
      newErrors.password = "";
  }

  switch (true) {
    case registerInfos?.passwordConfirmation.length === 0:
      newErrors.passwordConfirmation = errorText;
      break;
    case registerInfos?.passwordConfirmation.length < 7:
      newErrors.passwordConfirmation = "Minimum character length is 8";
      break;
    default:
      newErrors.passwordConfirmation = "";
  }

  setErrors(newErrors);
};
