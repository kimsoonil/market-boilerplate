import { authHeader } from "../helpers";
import { BASIC_API } from "src/api/api";
import { logout } from "./user.service";
import { handleResponse } from "./user.service";

export const deliveriesService = {
  getDeliveries,
  getDeliveriesId,
  patchDeliveries,
  patchDeliveriesDefault,
  postDeliveries,
  deleteDeliveries,
};

function getDeliveries() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${BASIC_API}/api/deliveries`, requestOptions).then(
    handleResponse
  );
}

function getDeliveriesId(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${BASIC_API}/api/deliveries/${id}`, requestOptions).then(
    handleResponse
  );
}

function patchDeliveries(id, response) {
  const requestOptions = {
    method: "PATCH",
    headers: authHeader(),
    body: JSON.stringify(response),
  };

  return fetch(`${BASIC_API}/api/deliveries/${id}`, requestOptions).then(
    handleResponse
  );
}

function patchDeliveriesDefault(id) {
  const requestOptions = {
    method: "PATCH",
    headers: authHeader(),
  };

  return fetch(
    `${BASIC_API}/api/deliveries/${id}/default`,
    requestOptions
  ).then(handleResponse);
}

function postDeliveries(response) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(response),
  };

  return fetch(`${BASIC_API}/api/deliveries`, requestOptions).then(
    handleResponse
  );
}

function deleteDeliveries(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${BASIC_API}/api/deliveries/${id}`, requestOptions).then();
}
