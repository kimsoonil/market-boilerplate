import { productConstants } from "../constants";

const initalState = {
  loading: false,
  data: null,
  list: null,
  product: null,
  model: null,
  payment: null,
  purchases: null,
  error: null,
};

export function products(state = initalState, action) {
  switch (action.type) {
    case productConstants.PRODUCT_REGISTER_REQUEST:
      return {
        loading: true,
        product: null,
        error: null,
      };
    case productConstants.PRODUCT_REGISTER_SUCCESS:
      return {
        loading: false,
        product: action.products,
        error: null,
      };
    case productConstants.PRODUCT_REGISTER_FAILURE:
      return {
        loading: false,
        product: null,
        error: action.error,
      };
    case productConstants.PRODUCT_ID_REGISTER_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case productConstants.PRODUCT_ID_REGISTER_SUCCESS:
      return {
        loading: false,
        data: action.product,
        error: null,
      };
    case productConstants.PRODUCT_ID_REGISTER_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    case productConstants.PRODUCT_LIST_REGISTER_REQUEST:
      return {
        loading: true,
        list: null,
        error: null,
      };
    case productConstants.PRODUCT_LIST_REGISTER_SUCCESS:
      return {
        loading: false,
        list: action.productList,
        error: null,
      };
    case productConstants.PRODUCT_LIST_REGISTER_FAILURE:
      return {
        loading: false,
        list: null,
        error: action.error,
      };
    case productConstants.PRODUCT_MODEL_REGISTER_REQUEST:
      return {
        loading: true,
        model: null,
        error: null,
      };
    case productConstants.PRODUCT_MODEL_REGISTER_SUCCESS:
      return {
        loading: false,
        model: action.model,
        error: null,
      };
    case productConstants.PRODUCT_MODEL_REGISTER_FAILURE:
      return {
        loading: false,
        model: null,
        error: action.error,
      };
    case productConstants.PRODUCT_PAYMENT_REGISTER_REQUEST:
      return {
        loading: true,
        model: null,
        error: null,
      };
    case productConstants.PRODUCT_PAYMENT_REGISTER_SUCCESS:
      return {
        loading: false,
        payment: action.payment,
        error: null,
      };
    case productConstants.PRODUCT_PAYMENT_REGISTER_FAILURE:
      return {
        loading: false,
        model: null,
        error: action.error,
      };
    case productConstants.PURCHASES_REGISTER_REQUEST:
      return {
        loading: true,
        purchases: null,
        error: null,
      };
    case productConstants.PURCHASES_REGISTER_SUCCESS:
      return {
        loading: true,
        purchases: action.purchases,
        error: null,
      };
    case productConstants.PURCHASES_REGISTER_FAILURE:
      return {
        loading: false,
        purchases: null,
        error: action.error,
      };
    default:
      return state;
  }
}
