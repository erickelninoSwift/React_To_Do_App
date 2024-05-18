import React from "react";

const Progress = ({ progress }) => {
  const colors = [
    "red",
    "yellow",
    "black",
    "orange",
    "blue",
    "green",
    "purple",
    "pink",
  ];
  const colorPicked = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: `${colorPicked}` }}
      ></div>
    </div>
  );
};

export default Progress;
