import React from "react";

export default function ProgressBar({ height = 10, done, total }) {
  const translate = done / total;
  return (
    <div className="maindiv" style={{ height }}>
      <div
        className="progress"
        style={{ height, transform: `scaleX(${translate})` }}
      />
      <div className="info"></div>
    </div>
  );
}
