import { authHeader } from "../helpers";
import { BASIC_API } from "src/api/api";
import { logout } from "./user.service";
import { handleResponse } from "./user.service";

export const optionService = {
  getOptions,
  getOptionGroups,
};

function getOptions(id, response) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(
    `${BASIC_API}/api/version-models/${id}/options?ids=${response}`,
    requestOptions
  ).then(handleResponse);
}

function getOptionGroups(id) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(
    `${BASIC_API}/api/version-models/${id}/option-groups`,
    requestOptions
  ).then(handleResponse);
}
