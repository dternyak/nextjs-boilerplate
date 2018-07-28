import jwtDecode from 'jwt-decode';

import types from './types';

export interface AuthState {
  token: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  statusText: string | null;
  isRegistering: boolean;
  isRegistered: boolean;
  registerStatusText: string | null;
}

export const INITIAL_STATE: AuthState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  isRegistering: false,
  isRegistered: false,
  registerStatusText: null
};

interface JWT {
  email: string
}

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.LOGIN_USER_PENDING:
      return {
        ...state,
        isAuthenticating: true,
        statusText: null
      };
    case types.LOGIN_USER_FULFILLED:
      return {
        ...state,
        isAuthenticating: false,
        token: action.payload.token,
        userName: (jwtDecode(action.payload.data.token) as JWT).email,
        statusText: action.payload.statusText
      };

    case types.LOGIN_USER_REJECTED:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: action.payload.statusText
      };

    case types.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: action.payload.statusText
      };

    case types.REGISTER_USER_FULFILLED:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        isRegistering: false,
        token: action.payload.token,
        userName: (jwtDecode(action.payload.data.token) as JWT).email,
        registerStatusText: action.payload.statusText
      };

    case types.REGISTER_USER_PENDING:
      return {
        ...state,
        isRegistering: true
      };

    case types.REGISTER_USER_REJECTED:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userName: null,
        registerStatusText: action.payload.statusText
      };

    default:
      return state;
  }
};
