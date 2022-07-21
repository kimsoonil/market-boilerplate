import { productConstants } from "../constants";
import { productService } from "../services";
import { alertActions } from "./alert.actions";
import { history } from "../helpers";

export const productActions = {
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
  return (dispatch) => {
    dispatch(request());

    productService.getProducts().then(
      (products) => dispatch(success(products)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PRODUCT_REGISTER_REQUEST };
  }
  function success(products) {
    return { type: productConstants.PRODUCT_REGISTER_SUCCESS, products };
  }
  function failure(error) {
    return { type: productConstants.PRODUCT_REGISTER_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function getProductId(id) {
  return (dispatch) => {
    dispatch(request(id));

    productService.getProductId(id).then(
      (product) => dispatch(success(product)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PRODUCT_ID_REGISTER_REQUEST };
  }
  function success(product) {
    return { type: productConstants.PRODUCT_ID_REGISTER_SUCCESS, product };
  }
  function failure(error) {
    return { type: productConstants.PRODUCT_ID_REGISTER_FAILURE, error };
  }
}
function getProductLists(id) {
  return (dispatch) => {
    dispatch(request(id));

    productService.getProductLists(id).then(
      (productList) => dispatch(success(productList)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PRODUCT_LIST_REGISTER_REQUEST };
  }
  function success(productList) {
    return {
      type: productConstants.PRODUCT_LIST_REGISTER_SUCCESS,
      productList,
    };
  }
  function failure(error) {
    return { type: productConstants.PRODUCT_LIST_REGISTER_FAILURE, error };
  }
}

function getProductListFilter(id, filter, page) {
  return (dispatch) => {
    dispatch(request(id));

    productService.getProductListFilter(id, filter, page).then(
      (productList) => dispatch(success(productList)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PRODUCT_LIST_REGISTER_REQUEST };
  }
  function success(productList) {
    return {
      type: productConstants.PRODUCT_LIST_REGISTER_SUCCESS,
      productList,
    };
  }
  function failure(error) {
    return { type: productConstants.PRODUCT_LIST_REGISTER_FAILURE, error };
  }
}

function getModelProduct(id) {
  return (dispatch) => {
    dispatch(request(id));

    productService.getModelProduct(id).then(
      (model) => dispatch(success(model)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PRODUCT_MODEL_REGISTER_REQUEST };
  }
  function success(model) {
    return {
      type: productConstants.PRODUCT_MODEL_REGISTER_SUCCESS,
      model,
    };
  }
  function failure(error) {
    return { type: productConstants.PRODUCT_MODEL_REGISTER_FAILURE, error };
  }
}
function postPayment(id) {
  return (dispatch) => {
    dispatch(request(id));

    productService.postPayment(id).then(
      (payment) => {
        dispatch(success(payment));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PRODUCT_PAYMENT_REGISTER_REQUEST };
  }
  function success(payment) {
    return {
      type: productConstants.PRODUCT_PAYMENT_REGISTER_SUCCESS,
      payment,
    };
  }
  function failure(error) {
    return { type: productConstants.PRODUCT_PAYMENT_REGISTER_FAILURE, error };
  }
}

function getPayment(id) {
  return (dispatch) => {
    dispatch(request(id));

    productService.getPayment(id).then(
      (payment) => dispatch(success(payment)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PRODUCT_PAYMENT_REGISTER_REQUEST };
  }
  function success(payment) {
    return {
      type: productConstants.PRODUCT_PAYMENT_REGISTER_SUCCESS,
      payment,
    };
  }
  function failure(error) {
    return { type: productConstants.PRODUCT_PAYMENT_REGISTER_FAILURE, error };
  }
}

function postPurchases(id, response) {
  return (dispatch) => {
    dispatch(request(id));

    productService.postPurchases(id, response).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PURCHASES_REGISTER_REQUEST };
  }
  function success(purchases) {
    return {
      type: productConstants.PURCHASES_REGISTER_SUCCESS,
      purchases,
    };
  }
  function failure(error) {
    return { type: productConstants.PURCHASES_REGISTER_FAILURE, error };
  }
}

function getPurchases(id) {
  return (dispatch) => {
    dispatch(request(id));

    productService.getPurchases(id).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PURCHASES_REGISTER_REQUEST };
  }
  function success(purchases) {
    return {
      type: productConstants.PURCHASES_REGISTER_SUCCESS,
      purchases,
    };
  }
  function failure(error) {
    return { type: productConstants.PURCHASES_REGISTER_FAILURE, error };
  }
}

function patchPurchases(id, response) {
  return (dispatch) => {
    dispatch(request(id));

    productService.patchPurchases(id, response).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.PURCHASES_REGISTER_REQUEST };
  }
  function success(purchases) {
    return {
      type: productConstants.PURCHASES_REGISTER_SUCCESS,
    };
  }
  function failure(error) {
    return { type: productConstants.PURCHASES_REGISTER_FAILURE, error };
  }
}
