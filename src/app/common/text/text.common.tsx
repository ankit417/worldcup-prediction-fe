import React from "react";

interface TextProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;

  displayxlarge?: boolean;
  displaylarge?: boolean;
  displaymedium?: boolean;
  pageheading?: boolean;
  heading?: boolean;
  body?: boolean;
  subheading?: boolean;
  caption?: boolean;
  button?: boolean;
}

export const Text = ({
  children,
  className,
  displayxlarge,
  displaylarge,
  displaymedium,
  pageheading,
  heading,
  body,
  subheading,
  caption,
  button,
  style,
  ...rest
}: TextProps) => {
  let cName = ["body"];

  if (displayxlarge) cName = ["displayxlarge"];
  if (displaylarge) cName = ["displaylarge"];
  if (displaymedium) cName = ["displaymedium"];
  if (pageheading) cName = ["pageheading"];
  if (heading) cName = ["heading"];
  if (subheading) cName = ["subheading"];
  if (body) cName = ["body"];
  if (caption) cName = ["caption"];
  if (button) cName = ["buttontext"];
  if (className) cName.push(className);

  return (
    <p
      {...rest}
      style={{
        ...style,
      }}
      className={cName.join(" ")}
    >
      {children}
    </p>
  );
};
