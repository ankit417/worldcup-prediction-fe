import React from "react";
// import { fonts } from "../../../../modules";
import { PaddingParams } from "../../common";
import { fonts } from "../../../modules";

interface UnderlineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  size?: number;
}

export const Underline = ({
  children,
  style,
  className,
  color,
  size = fonts.size.text,
}: UnderlineProps) => {
  return (
    <span
      className={`u ${className}`}
      style={{
        ...style,
        color,
        fontSize: size,
      }}
    >
      {children ? children : null}
    </span>
  );
};
