import { verificationsConstants } from "../constants";
import { verificationsService } from "../services";
import { history } from "../helpers";

export const verificationsActions = {
  getPhoneVerifications,
  postPhoneVerifications,
  postPhoneVerificationsCheck,
};

function getPhoneVerifications(id) {
  return (dispatch) => {
    dispatch(request(id));

    verificationsService.getPhoneVerifications(id).then(
      (verifications) => dispatch(success(verifications)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: verificationsConstants.VERIFICATIONS_GET_REQUEST };
  }
  function success(verifications) {
    return {
      type: verificationsConstants.VERIFICATIONS_GET_SUCCESS,
      verifications,
    };
  }
  function failure(error) {
    return { type: verificationsConstants.VERIFICATIONS_GET_FAILURE, error };
  }
}

function postPhoneVerifications(response) {
  return (dispatch) => {
    dispatch(request(response));

    verificationsService.postPhoneVerifications(response).then(
      (verifications) => dispatch(success(verifications)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: verificationsConstants.VERIFICATIONS_POST_REQUEST };
  }
  function success(verifications) {
    return {
      type: verificationsConstants.VERIFICATIONS_POST_SUCCESS,
      verifications,
    };
  }
  function failure(error) {
    return { type: verificationsConstants.VERIFICATIONS_POST_FAILURE, error };
  }
}

function postPhoneVerificationsCheck(response) {
  return (dispatch) => {
    dispatch(request(response));

    verificationsService.postPhoneVerificationsCheck(response).then(
      (verifications) => dispatch(success(verifications)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: verificationsConstants.VERIFICATIONS_CHECK_POST_REQUEST };
  }
  function success(verifications) {
    return {
      type: verificationsConstants.VERIFICATIONS_CHECK_POST_SUCCESS,
      verifications,
    };
  }
  function failure(error) {
    return {
      type: verificationsConstants.VERIFICATIONS_CHECK_POST_FAILURE,
      error,
    };
  }
}
