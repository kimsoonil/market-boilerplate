import { optionConstants } from "../constants";
import { optionService } from "../services";
import { history } from "../helpers";

export const optionActions = {
  getOptions,
  getOptionGroups,
};

function getOptions(id, response) {
  return (dispatch) => {
    dispatch(request(id, response));

    optionService.getOptions(id, response).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: optionConstants.OPTIONS_REGISTER_REQUEST };
  }
  function success(data) {
    return {
      type: optionConstants.OPTIONS_REGISTER_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return { type: optionConstants.OPTIONS_REGISTER_FAILURE, error };
  }
}

function getOptionGroups(id) {
  return (dispatch) => {
    dispatch(request(id));

    optionService.getOptionGroups(id).then(
      (option) => dispatch(success(option)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: optionConstants.OPTION_REGISTER_REQUEST };
  }
  function success(option) {
    return {
      type: optionConstants.OPTION_REGISTER_SUCCESS,
      option,
    };
  }
  function failure(error) {
    return { type: optionConstants.OPTION_REGISTER_FAILURE, error };
  }
}
