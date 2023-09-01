export const roleVlidation = (roleInfos, errors, setErrors) => {
  const newErrors = { ...errors };

  if (roleInfos?.code.length == 0) {
    newErrors.code = "code cannot be empty";
  } else {
    newErrors.code = "";
  }

  if (roleInfos.name.length == 0) {
    newErrors.name = "name cannot be empty";
  } else {
    newErrors.name = "";
  }
  setErrors(newErrors);
};
