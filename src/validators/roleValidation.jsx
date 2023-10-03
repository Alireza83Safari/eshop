export const roleValidation = (roleInfos, errors, setErrors) => {
  const newErrors = { ...errors };
  const errorText = "This field cannot be empty.";

  switch (true) {
    case roleInfos?.code.length === 0:
      newErrors.code = errorText;
      break;
    default:
      newErrors.code = "";
  }

  switch (true) {
    case roleInfos?.name.length === 0:
      newErrors.name = errorText;
      break;
    default:
      newErrors.name = "";
  }

  setErrors(newErrors);
};
