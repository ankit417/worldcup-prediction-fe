import React from "react";
import { PaddingParams } from "../index";
interface LinkProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  link?: string;
  target: "_self" | "_blank" | "_parent" | "_top";
}

export const Link = ({
  children,
  style,
  link,
  target,
  className,
}: LinkProps) => {
  return (
    <a
      href={link}
      target={target ? target : "_self"}
      className={`a ${className}`}
      style={{
        ...style,
      }}
    >
      {children ? children : null}
    </a>
  );
};
