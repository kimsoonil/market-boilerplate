import { verificationsConstants } from "../constants";

const initalState = {
  loading: false,
  data: null,
  error: null,
};

export function verifications(state = initalState, action) {
  switch (action.type) {
    case verificationsConstants.VERIFICATIONS_GET_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case verificationsConstants.VERIFICATIONS_GET_SUCCESS:
      return {
        loading: false,
        data: action.verifications,
        error: null,
      };
    case verificationsConstants.VERIFICATIONS_GET_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    case verificationsConstants.VERIFICATIONS_POST_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case verificationsConstants.VERIFICATIONS_POST_SUCCESS:
      return {
        loading: false,
        data: action.verifications,
        error: null,
      };
    case verificationsConstants.VERIFICATIONS_POST_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    case verificationsConstants.VERIFICATIONS_CHECK_POST_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case verificationsConstants.VERIFICATIONS_CHECK_POST_SUCCESS:
      return {
        loading: false,
        data: action.verifications,
        error: null,
      };
    case verificationsConstants.VERIFICATIONS_CHECK_POST_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.error,
      };

    default:
      return state;
  }
}
