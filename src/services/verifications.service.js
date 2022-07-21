import { authHeader } from "../helpers";
import { BASIC_API } from "src/api/api";
import { logout } from "./user.service";
import { handleResponse } from "./user.service";

export const verificationsService = {
  getPhoneVerifications,
  postPhoneVerifications,
  postPhoneVerificationsCheck,
};

function getPhoneVerifications(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `${BASIC_API}/api/phone-verifications/${id}`,
    requestOptions
  ).then(handleResponse);
}

function postPhoneVerifications(response) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(response),
  };

  return fetch(`${BASIC_API}/api/phone-verifications`, requestOptions).then(
    handleResponse
  );
}

function postPhoneVerificationsCheck(response) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(response),
  };

  return fetch(
    `${BASIC_API}/api/phone-verifications/check`,
    requestOptions
  ).then(handleResponse);
}
