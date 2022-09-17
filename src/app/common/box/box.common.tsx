import React from "react";

import {
  withDefaultSpacingProps,
  PaddingParams,
} from "../../common/withDefaultSpacingProps/withDefaultSpacingProps.common";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, PaddingParams {
  children?: React.ReactNode;
  flexBox?: boolean;
  row?: boolean;
  flex?: number;
  vertical?: boolean;
  jCenter?: boolean;
  jSpace?: boolean;
  jEnd?: boolean;
  alCenter?: boolean;
  alStart?: boolean;
  alEnd?: boolean;
  rowGap?: number;
  columnGap?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Box = withDefaultSpacingProps<BoxProps>((props: BoxProps) => {
  const {
    children,
    flexBox,
    flex,
    row,
    vertical,
    jCenter,
    jSpace,
    jEnd,
    alCenter,
    alStart,
    alEnd,
    rowGap = 20,
    columnGap = 20,
    className,
    style,
    ...rest
  } = props;

  const cName = ["box"];
  if (flexBox) cName.push("flex");
  if (row) cName.push("horizontal");
  if (vertical) cName.push("vertical");
  if (jCenter) cName.push("j-center");
  if (jSpace) cName.push("j-space");
  if (jEnd) cName.push("j-end");
  if (alStart) cName.push("al-start");
  if (alCenter) cName.push("al-center");
  if (alEnd) cName.push("al-end");
  if (className) cName.push(className);

  return (
    <div
      {...rest}
      style={{
        rowGap,
        columnGap,
        flex,
        ...style,
      }}
      className={cName.join(" ")}
    >
      {children}
    </div>
  );
});
