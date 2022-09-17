import React from "react";

export const useDebounceValue = (value: string) => {
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    const handler = setTimeout(function () {
      setSearchValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return searchValue;
};
