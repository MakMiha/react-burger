import {
  AUTH_SUCCESS,
  AUTH_REQUEST,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_ERROR,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_ERROR,
  TAuthActions
} from '../actions/auth';

type TAuthState = {
  authRequest: boolean,
  authError: boolean,
  isAuth: boolean,
  logoutRequest: boolean,
  logoutError: boolean,
  updateTokenRequest: boolean,
  updateTokenError: boolean,
};

const authInitialState: TAuthState = {
  authRequest: false,
  authError: false,
  isAuth: false,
  logoutRequest: false,
  logoutError: false,
  updateTokenRequest: false,
  updateTokenError: false,
};

export const authReducer = ( state = authInitialState, action: TAuthActions ): TAuthState => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authError: false,
        isAuth: true,
      };
    }
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authError: false,
        isAuth: false,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        authRequest: false,
        authError: true,
        isAuth: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: false,
        isAuth: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutError: false,
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: true,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenError: false,
        isAuth: true,
      };
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenError: false,
      };
    }
    case UPDATE_TOKEN_ERROR: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenError: true,
      };
    }
    default: {
      return state;
    }
  }
};