import { useEffect } from "react";

export const useDocTitle = (title?: string) => {
  useEffect(() => {
    document.title = `Dunbel  | ${title}`;
  }, [title]);
};
