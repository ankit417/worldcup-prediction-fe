import React from "react";
import { PaddingParams } from "../index";

interface ItalicProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Italic = ({ children, style, className }: ItalicProps) => {
  return (
    <span
      className={`i ${className}`}
      style={{
        ...style,
      }}
    >
      {children ? children : null}
    </span>
  );
};
