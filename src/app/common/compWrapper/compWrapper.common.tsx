import { ReactNode } from "react";
import { useAuth } from "react-auth-navigation";
// import { useAuth } from "react-auth-navigation";
import {
  // useAnimatedValue,
  AnimatedBlock,
  bInterpolate,
  useAnimatedValue,
  // bInterpolate,
} from "react-ui-animate";
import { Header } from "../index";

interface CompWrapperProps {
  children: ReactNode;
}

export const CompWrapper = ({ children }: CompWrapperProps) => {
  const { sideMenuStable } = useAuth();
  const sideMenuStableAnimation = useAnimatedValue(sideMenuStable);

  return (
    <AnimatedBlock
      className="compwrapper-container"
      style={{
        paddingLeft: bInterpolate(sideMenuStableAnimation.value, [110, 300]),
      }}
    >
      <Header />
      <div className="compwrapper">{children}</div>
    </AnimatedBlock>
  );
};
