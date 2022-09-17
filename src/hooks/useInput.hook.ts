import { useState } from "react";

export const useInput = (fields: any) => {
  const [data, setData] = useState<any>({
    ...fields,
  });
  const [error, setError] = useState({});

  const onChangeHandler = (name: any, value?: string) => {
    return function (e?: any) {
      !!e && e.persist();

      setError((prev: any) => {
        if (
          (value !== undefined && value !== null) ||
          (e?.target?.value !== undefined && e?.target?.value !== null)
        ) {
          return { ...prev, [name]: false };
        }
      });

      setData((prev: any) => {
        if (value === undefined || value === null) {
          return { ...prev, [name]: e.target.value };
        } else {
          return { ...prev, [name]: value };
        }
      });
    };
  };
  return { data, onChangeHandler, error, setError };
};
