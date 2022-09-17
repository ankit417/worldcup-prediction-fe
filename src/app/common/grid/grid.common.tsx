import React from "react";
import { useBreakPoints } from "../../../hooks";

interface GridContainerProps {
  lg: number;
  md: number;
  sm: number;
  children: React.ReactNode;
}
const GridContainer = ({ lg, md, sm, children }: GridContainerProps) => {
  const [size, setSize] = React.useState<string>("");
  useBreakPoints(
    {
      576: "sm",
      768: "md",
      15000: "lg",
    },
    function (value: string) {
      setSize(value);
    }
  );

  const getRepeat = (size: string) => {
    switch (size) {
      case "sm":
        return sm;
      case "md":
        return md;
      case "lg":
        return lg;
      default:
        return lg;
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${getRepeat(size)},1fr)`,
        rowGap: 16,
        columnGap: 16,
      }}
    >
      {children}
    </div>
  );
};

interface GridItemProps {
  lg?: number;
  children: React.ReactNode;
}
const GridItem = ({ children }: GridItemProps) => {
  return (
    <div
      style={{
        background: "red",
        width: "100%",
        height: 100,
      }}
    >
      {children}
    </div>
  );
};

export const Grid = {
  Container: GridContainer,
  Item: GridItem,
};
