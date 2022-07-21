import { userConstants } from "../constants";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
        error: null,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: false,
        user: action.user,
        error: null,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        error: action.error,
        user: null,
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
}
