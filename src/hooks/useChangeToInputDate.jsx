import { useState, useEffect } from "react";

export const useChangeToInputDate = (inputDate) => {
  const [chanageToInputDate, setChanageToInputDate] = useState("");

  useEffect(() => {
    const inputDateTime = new Date(inputDate);
    const year = inputDateTime.getFullYear();
    const month = (inputDateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDateTime.getDate().toString().padStart(2, "0");
    const serverFormatString = `${year}-${month}-${day}`;
    setChanageToInputDate(serverFormatString);
  }, [inputDate]);
  return { chanageToInputDate };
};
