import { alertActions } from "./alert.actions";
import { userConstants } from "../constants";
import { userService } from "../services";
import { history } from "../helpers";

export const userActions = {
  logout,
  register,
  getAll,
  getMe,
  signUp,
  KaKaoLogin,
  AppleLogin,
  delete: userDelete,
};

function KaKaoLogin(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.KaKaoLogin(user).then(
      (user) => {
        dispatch(success(user));

        if (user.message === "가입된 카카오 계정이 없습니다.") {
          dispatch(alertActions.error(user.message));
        } else {
          dispatch(alertActions.success("로그인 성공"));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}
function AppleLogin(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.AppleLogin(user).then(
      (user) => {
        dispatch(success(user));

        if (user.message === "가입된 애플 계정이 없습니다.") {
          dispatch(alertActions.error(user.message));
        } else {
          dispatch(alertActions.success("로그인 성공"));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}
function getMe() {
  return (dispatch) => {
    dispatch(request({}));

    userService.getMe().then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.GEL_ME_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.GEL_ME_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GEL_ME_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        dispatch(alertActions.success("로그인 성공"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function signUp(response) {
  return (dispatch) => {
    userService.signUp(response).then(
      (user) => {
        dispatch(alertActions.success("회원가입 성공"));
      },
      (error) => {
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function userDelete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      () => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
