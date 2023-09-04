export const appPicValidation = (appicInfo, errors, setErrors) => {
  const newErrors = { ...errors };

  if (appicInfo?.description.length == 0) {
    newErrors.description = "description cannot be empty";
  } else {
    newErrors.description = "";
  }

  if (appicInfo.priority.length == 0) {
    newErrors.priority = "priority cannot be empty";
  } else {
    newErrors.priority = "";
  }

  if (appicInfo.title.length == 0) {
    newErrors.title = "title cannot be empty";
  } else {
    newErrors.title = "";
  }

  if (appicInfo.url.length == 0) {
    newErrors.url = "url cannot be empty";
  } else {
    newErrors.url = "";
  }
  setErrors(newErrors);
};
