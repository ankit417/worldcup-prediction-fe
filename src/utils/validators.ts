// VALIDATOR
export function validator(errorObject: any) {
  return function (key: any, condition: boolean, callback: () => void) {
    if (condition) {
      errorObject[key] = true;
      callback && callback();
    } else {
      delete errorObject[key];
    }
  };
}

export function isValid(errorObject: any) {
  return Object.keys(errorObject).length === 0;
}
