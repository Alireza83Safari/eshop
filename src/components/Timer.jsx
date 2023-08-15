import React, { useEffect, useState } from "react";

export default function Timer({ days }) {
  const [day, setDay] = useState(days);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            if (day > 0) {
              setDay((prevDay) => prevDay - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            } else {
              clearInterval(timer);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [day, hours, minutes, seconds]);

  return (
    <div className="lg:text-base text-sm flex">
      <div className="flex justify-center items-center lg:w-14 lg:h-14 h-11 w-11 rounded-xl text-white-100 bg-blue-600 mr-6">
        {day !== undefined ? day.toString().padStart(2, "0") : "00"}
      </div>
      <div className="flex justify-center items-center lg:w-14 lg:h-14 h-11 w-11 rounded-xl text-white-100 bg-blue-600 mr-6">
        {hours !== undefined ? hours.toString().padStart(2, "0") : "00"}
      </div>
      <div className="flex justify-center items-center lg:w-14 lg:h-14 h-11 w-11 rounded-xl text-white-100 bg-blue-600 mr-6">
        {minutes !== undefined ? minutes.toString().padStart(2, "0") : "00"}
      </div>
      <div className="flex justify-center items-center lg:w-14 lg:h-14 h-11 w-11 rounded-xl text-white-100 bg-blue-600 mr-6">
        {seconds !== undefined ? seconds.toString().padStart(2, "0") : "00"}
      </div>
    </div>
  );
}
