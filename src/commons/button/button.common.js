import React from "react";

export const DefaultButton = React.forwardRef((props, ref) => {
  const { title, selected, lefticon, righticon, classname, ...rest } = props;
  return (
    <button className={`button default ${classname}`} {...rest}>
      {lefticon}
      {title}
      {righticon}
      {selected && "Selected"}
    </button>
  );
});

export const PrimaryButton = React.forwardRef((props, ref) => {
  const { onClick, title, lefticon, righticon, className, ...rest } = props;
  return (
    <button
      onClick={onClick}
      className={`button primary ${className}`}
      {...rest}
    >
      {lefticon}
      {title}
      {righticon}
    </button>
  );
});
