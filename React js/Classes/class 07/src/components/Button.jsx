import React from "react";

export const Button = ({ text, style }) => {
  return (
    <div>
      <button style={style}>{text}</button>
    </div>
  );
};
