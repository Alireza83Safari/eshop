import { useState, useEffect } from "react";

export const useChangeDate = (inputDate, exValue) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const dateObject = new Date(exValue ? exValue : inputDate);
    const time = `${String(dateObject.getHours()).padStart(2, "0")}:${String(
      dateObject.getMinutes()
    ).padStart(2, "0")}:${String(dateObject.getSeconds()).padStart(2, "0")}`;
    setFormattedDate(`${inputDate}T${time}Z`);
  }, [exValue ? exValue : inputDate]);
  return { formattedDate };
};
