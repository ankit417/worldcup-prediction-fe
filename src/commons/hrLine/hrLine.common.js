import React from "react";

export const HrLine = ({ gap }) => {
  return (
    <div
      className="hrLine"
      style={{ marginTop: gap ?? 5, marginBottom: gap ?? 5 }}
    />
  );
};
