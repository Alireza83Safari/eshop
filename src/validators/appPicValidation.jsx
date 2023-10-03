export const appPicValidation = (appicInfo, errors, setErrors) => {
  const newErrors = { ...errors };
  const errorText = "This field cannot be empty.";

  switch (true) {
    case appicInfo?.description.length === 0:
      newErrors.description = errorText;
      break;
    default:
      newErrors.description = "";
  }

  switch (true) {
    case appicInfo.priority.length === 0:
      newErrors.priority = errorText;
      break;
    default:
      newErrors.priority = "";
  }

  switch (true) {
    case appicInfo.title.length === 0:
      newErrors.title = errorText;
      break;
    default:
      newErrors.title = "";
  }

  switch (true) {
    case appicInfo.url.length === 0:
      newErrors.url = errorText;
      break;
    default:
      newErrors.url = "";
  }

  setErrors(newErrors);
};
