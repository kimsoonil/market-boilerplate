import { deliveriesConstants } from "../constants";

const initalState = {
  loading: false,
  data: null,
  deliveries: null,
  deliveriesId: null,
  error: null,
};

export function deliveries(state = initalState, action) {
  switch (action.type) {
    case deliveriesConstants.DELIVERIES_GET_REQUEST:
      return {
        loading: true,
        deliveries: null,
        error: null,
      };
    case deliveriesConstants.DELIVERIES_GET_SUCCESS:
      return {
        loading: false,
        deliveries: action.deliveries,
        error: null,
      };
    case deliveriesConstants.DELIVERIES_GET_FAILURE:
      return {
        loading: false,
        deliveries: null,
        error: action.error,
      };
    case deliveriesConstants.DELIVERIES_ID_GET_REQUEST:
      return {
        loading: true,
        deliveriesId: null,
        error: null,
      };
    case deliveriesConstants.DELIVERIES_ID_GET_SUCCESS:
      return {
        loading: false,
        deliveriesId: action.deliveriesId,
        error: null,
      };
    case deliveriesConstants.DELIVERIES_ID_GET_FAILURE:
      return {
        loading: false,
        deliveriesId: null,
        error: action.error,
      };
    default:
      return state;
  }
}
