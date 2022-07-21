import { deliveriesConstants } from "../constants";
import { deliveriesService } from "../services";
import { history } from "../helpers";

export const deliveriesActions = {
  getDeliveries,
  getDeliveriesId,
  patchDeliveries,
  patchDeliveriesDefault,
  postDeliveries,
  deleteDeliveries,
};

function getDeliveries() {
  return (dispatch) => {
    dispatch(request());

    deliveriesService.getDeliveries().then(
      (deliveries) => dispatch(success(deliveries)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: deliveriesConstants.DELIVERIES_GET_REQUEST };
  }
  function success(deliveries) {
    return { type: deliveriesConstants.DELIVERIES_GET_SUCCESS, deliveries };
  }
  function failure(error) {
    return { type: deliveriesConstants.DELIVERIES_GET_FAILURE, error };
  }
}

function getDeliveriesId(id) {
  return (dispatch) => {
    dispatch(request(id));

    deliveriesService.getDeliveriesId(id).then(
      (deliveriesId) => dispatch(success(deliveriesId)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: deliveriesConstants.DELIVERIES_ID_GET_REQUEST };
  }
  function success(deliveriesId) {
    return {
      type: deliveriesConstants.DELIVERIES_ID_GET_SUCCESS,
      deliveriesId,
    };
  }
  function failure(error) {
    return { type: deliveriesConstants.DELIVERIES_ID_GET_FAILURE, error };
  }
}

function patchDeliveries(id, response) {
  return (dispatch) => {
    dispatch(request(id));

    deliveriesService.patchDeliveries(id, response).then(
      (deliveries) => {
        dispatch(success(deliveries));
        dispatch(getDeliveries());
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: deliveriesConstants.DELIVERIES_PATCH_REQUEST };
  }
  function success(deliveries) {
    return {
      type: deliveriesConstants.DELIVERIES_PATCH_SUCCESS,
      deliveries,
    };
  }
  function failure(error) {
    return { type: deliveriesConstants.DELIVERIES_PATCH_FAILURE, error };
  }
}

function postDeliveries(response) {
  return (dispatch) => {
    dispatch(request(response));

    deliveriesService.postDeliveries(response).then(
      (deliveries) => {
        dispatch(getDeliveries());
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: deliveriesConstants.DELIVERIES_POST_REQUEST };
  }
  function success(deliveries) {
    return {
      type: deliveriesConstants.DELIVERIES_POST_SUCCESS,
      deliveries,
    };
  }
  function failure(error) {
    return { type: deliveriesConstants.DELIVERIES_POST_FAILURE, error };
  }
}
function deleteDeliveries(id) {
  return (dispatch) => {
    dispatch(request(id));

    deliveriesService.deleteDeliveries(id).then(
      (deliveries) => {
        dispatch(getDeliveries());
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: deliveriesConstants.DELIVERIES_DELETE_REQUEST };
  }
  function success(deliveries) {
    return {
      type: deliveriesConstants.DELIVERIES_DELETE_SUCCESS,
      deliveries,
    };
  }
  function failure(error) {
    return { type: deliveriesConstants.DELIVERIES_DELETE_FAILURE, error };
  }
}
function patchDeliveriesDefault(id) {
  return (dispatch) => {
    dispatch(request(id));

    deliveriesService.patchDeliveriesDefault(id).then(
      (deliveries) => {
        dispatch(success(deliveries));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: deliveriesConstants.DELIVERIES_PATCH_DEFAULT_REQUEST };
  }
  function success(deliveries) {
    return {
      type: deliveriesConstants.DELIVERIES_PATCH_DEFAULT_SUCCESS,
      deliveries,
    };
  }
  function failure(error) {
    return {
      type: deliveriesConstants.DELIVERIES_PATCH_DEFAULT_FAILURE,
      error,
    };
  }
}
