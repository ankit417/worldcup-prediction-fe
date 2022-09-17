import React from "react";
import PropTypes from "prop-types";
import { PaddingParams } from "../index";

interface HeadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PaddingParams {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Heading = ({ children, style, className }: HeadingProps) => {
  return (
    <h1
      className={`h1 ${className}`}
      style={{
        ...style,
      }}
    >
      {children ? children : null}
    </h1>
  );
};

Heading.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  p: PropTypes.number,
  pl: PropTypes.number,
  pr: PropTypes.number,
  pt: PropTypes.number,
  pb: PropTypes.number,
  m: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
  className: PropTypes.string,
};

Heading.defaultProps = {
  p: 0,
  m: 0,
};
