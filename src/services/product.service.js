import { authHeader } from "../helpers";
import { BASIC_API } from "src/api/api";
import { logout } from "./user.service";
import { handleResponse } from "./user.service";

export const productService = {
  getProducts,
  getProductId,
  getProductLists,
  getProductListFilter,
  getModelProduct,
  postPayment,
  getPayment,
  postPurchases,
  getPurchases,
  patchPurchases,
};

function getProducts() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${BASIC_API}/api/version-models`, requestOptions).then(
    handleResponse
  );
}

function getProductId(id) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${BASIC_API}/api/version-models/${id}`, requestOptions).then(
    handleResponse
  );
}

function getProductLists(id) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(
    `${BASIC_API}/api/version-models/${id}/products`,
    requestOptions
  ).then(handleResponse);
}

function getProductListFilter(id, filter, page) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(
    `${BASIC_API}/api/version-models/${id}/products?${filter}&page=${page}`,
    requestOptions
  ).then(handleResponse);
}

function getModelProduct(id) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${BASIC_API}/api/products/${id}`, requestOptions).then(
    handleResponse
  );
}

function postPayment(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };

  return fetch(`${BASIC_API}/api/products/${id}/payment`, requestOptions).then(
    handleResponse
  );
}

function getPayment(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${BASIC_API}/api/payments/${id}`, requestOptions).then(
    handleResponse
  );
}
function postPurchases(id, response) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(response),
  };

  return fetch(`${BASIC_API}/api/products/${id}/purchase`, requestOptions).then(
    handleResponse
  );
}
function getPurchases(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${BASIC_API}/api/purchases/${id}`, requestOptions).then(
    handleResponse
  );
}
function patchPurchases(id, response) {
  const requestOptions = {
    method: "PATCH",
    headers: authHeader(),
    body: JSON.stringify(response),
  };

  return fetch(
    `${BASIC_API}/api/purchases/${id}/delivery`,
    requestOptions
  ).then(handleResponse);
}
