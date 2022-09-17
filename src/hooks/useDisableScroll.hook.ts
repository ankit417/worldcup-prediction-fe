import { useEffect } from "react";

export const useDisableScroll = (bool: boolean) => {
  useEffect(() => {
    document.body.style.overflow = bool ? "hidden" : "auto";
  }, [bool]);
};
