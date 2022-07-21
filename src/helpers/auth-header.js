import Cookies from "universal-cookie";

const cookies = new Cookies();

export function authHeader() {
  // return authorization header with jwt token
  const user = cookies.get("token");

  // if (user && user.token) {
  return {
    Authorization: `Token ${user}`,
    "Content-Type": "application/json",
  };
  // }

  // return false;
}
