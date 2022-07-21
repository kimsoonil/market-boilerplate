import { authHeader } from "../helpers";
import { BASIC_API } from "src/api/api";
import Cookies from "universal-cookie";

export const userService = {
  login,
  logout,
  signUp,
  register,
  update,
  getMe,
  KaKaoLogin,
  AppleLogin,
  delete: userDelete,
};
const cookies = new Cookies();
function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { email, password },
  };

  return fetch(`${BASIC_API}/users/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      cookies.set("token", user);
      return user;
    });
}

export function logout() {
  // remove user from local storage to log user out
  cookies.remove("token");
  window.location.href = window.location.origin + "/login";
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${BASIC_API}/api/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      cookies.set("token", JSON.stringify(user.result.token));
      return user;
    });
}

function KaKaoLogin(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${BASIC_API}/api/login/kakao`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.message !== "가입된 카카오 계정이 없습니다.") {
        cookies.set("token", JSON.stringify(user.result.token));
      }

      return user;
    });
}

function AppleLogin(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${BASIC_API}/api/login/apple`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.message !== "가입된 애플 계정이 없습니다.") {
        cookies.set("token", JSON.stringify(user.result.token));
      }

      return user;
    });
}

function getMe() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${BASIC_API}/api/me`, requestOptions).then(handleResponse);
}
function signUp(response) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  };

  return fetch(`${BASIC_API}/api/sign-up`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      cookies.set("token", JSON.stringify(user.result.token));
      return user;
    });
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function userDelete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // auto logout if 401 response returned from api
        logout();
      } else {
        // window.history.back();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
