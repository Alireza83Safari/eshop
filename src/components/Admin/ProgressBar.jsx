import React, { useState, useEffect } from "react";
import "../../App.css";
const ProgressBar = ({ value, maxValue }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((value / maxValue) * 100);
  }, [value, maxValue]);

  return (
    <div className="progress">
      <progress
        className="w-full custom-progress-bar"
        value={progress}
        max="100"
      ></progress>
    </div>
  );
};

export default ProgressBar;
