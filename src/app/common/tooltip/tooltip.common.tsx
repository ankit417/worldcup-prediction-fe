import React from "react";

interface ToolTipProp {
  children: React.ReactNode;
  text?: string;
  style?: any;
  containerStyle?: any;
  left?: any;
  right?: any;
  top?: any;
  down?: any;
}

export const ToolTip = (props: ToolTipProp) => {
  const { children, text, style, containerStyle, left, right, top } = props;
  const position = top
    ? { bottom: "100%", left: "50%", transform: "translateX(-50%)" }
    : right
    ? { left: "100%", top: "50%", transform: "translateY(-50%)" }
    : left
    ? { right: "100%", top: "50%", transform: "translateY(-50%)" }
    : { top: "100%", left: "50%", transform: "translateX(-50%)" };

  return (
    <span className="tooltip-wrapper" style={{ ...containerStyle }}>
      {children ? children : null}
      <span className="tooltip-text" style={Object.assign(position, style)}>
        {text ? text : null}
      </span>
    </span>
  );
};
