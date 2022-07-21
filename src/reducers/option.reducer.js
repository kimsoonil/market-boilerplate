import { optionConstants } from "../constants";

const initalState = {
  loading: false,
  data: null,
  option: null,
  error: null,
};

export function options(state = initalState, action) {
  switch (action.type) {
    case optionConstants.OPTION_REGISTER_REQUEST:
      return {
        loading: true,
        option: null,
        error: null,
      };
    case optionConstants.OPTION_REGISTER_SUCCESS:
      return {
        loading: false,
        option: action.option,
        error: null,
      };
    case optionConstants.OPTION_REGISTER_FAILURE:
      return {
        loading: false,
        option: null,
        error: action.error,
      };
    case optionConstants.OPTIONS_REGISTER_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case optionConstants.OPTIONS_REGISTER_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case optionConstants.OPTIONS_REGISTER_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}
