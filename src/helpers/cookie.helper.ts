import Cookies from "universal-cookie";

const cookies = new Cookies();

// TO SET COOKIES
export function setCookie(key: any, value: any) {
  cookies.set(`${key}`, value, { path: "/", maxAge: 82800 });
}

// TO GET VALUES
export function getCookie(key: any) {
  return cookies.get(`${key}`);
}

// TO CLEAR THE COOKIE
export function removeCookie(key: any) {
  cookies.remove(`${key}`, { path: "/" });
}
