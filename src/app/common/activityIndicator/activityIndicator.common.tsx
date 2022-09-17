import { ReactNode } from "react";

interface CompWrapperProps {
  animating: Boolean;
  style?: any;
  children?: ReactNode;
}

export function ActivityIndicator({
  animating,
  children,
  style,
}: CompWrapperProps) {
  if (animating) {
    return (
      <div style={style} className="activityindicator-container">
        <div className="activityindicator">
          <div className="activityindicator-loader"></div>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
