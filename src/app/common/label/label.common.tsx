import React from "react";
import { PaddingParams } from "../index";

export interface LabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Label = ({ children, style, className }: LabelProps) => {
  return (
    <span
      className={`label ${className}`}
      style={{
        ...style,
      }}
    >
      {children ? children : null}
    </span>
  );
};
