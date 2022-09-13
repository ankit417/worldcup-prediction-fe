import React from "react";

export const RadioButton = ({ name, title, value = null }) => {
  return (
    <div className="radioButton">
      <input className="radioBox" type="radio" value={value} name={name} />
      <span className="label">{title}</span>
    </div>
  );
};
