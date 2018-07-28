import { Dispatch } from 'redux';
import Router from 'next/router';

import types from './types';
import { getTokenAPI, createUserAPI } from 'api/api';

export function loginUserRejected(status: number, statusText: string) {
  return {
    type: types.LOGIN_USER_REJECTED,
    payload: {
      status,
      statusText
    }
  };
}

export function loginUserRequest() {
  return {
    type: types.LOGIN_USER_PENDING
  };
}

export function logoutUser() {
  return {
    type: types.LOGOUT_USER
  };
}

export function logoutAndRedirect() {
  return (dispatch: Dispatch) => {
    dispatch(logoutUser());
  };
}

export function registerUserSuccess(token: string) {
  return {
    type: types.REGISTER_USER_FULFILLED,
    payload: {
      token
    }
  };
}

export function registerUserRejected(status: number, statusText: string) {
  return {
    type: types.REGISTER_USER_REJECTED,
    payload: {
      status,
      statusText
    }
  };
}

export function registerUser(email: string, password: string) {
  return async (dispatch: Dispatch<any>) => {
    try {
      await dispatch({
        type: types.REGISTER_USER,
        payload: createUserAPI(email, password)
      });
    } catch (e) {
      registerUserRejected(e.response.status, e.response.statusText);
    }
  };
}

export type TLoginUser = typeof loginUser;
export function loginUser(email: string, password: string) {
  return async (dispatch: Dispatch<any>) => {
    try {
      await dispatch({
        type: types.LOGIN_USER,
        payload: async () => {
          const response = await getTokenAPI(email, password);
          localStorage.setItem('token', response.data.token);
          Router.push({
            pathname: '/profile'
          });
          return response;
        }
      });
    } catch (e) {
      dispatch(loginUserRejected(e.response.status, e.response.statusText));
    }
  };
}
