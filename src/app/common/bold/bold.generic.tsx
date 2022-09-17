import React from "react";
import { PaddingParams } from "..";

interface BoldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  size?: string;
  color?: string;
}

export const Bold = ({
  children,
  style,
  className,
  color,
  size,
}: BoldProps) => {
  return (
    <span
      className={`b ${className}`}
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
