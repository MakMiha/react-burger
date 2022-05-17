import { URL } from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { getUserInfo, SET_USER, CLEAR_USER_INFO } from './user-info';
import { AppDispatch, AppThunk } from '../hooks';

export const AUTH_SUCCESS: 'AUTH_SUCCESS' = 'AUTH_SUCCESS';
export const AUTH_REQUEST: 'AUTH_REQUEST' = 'AUTH_REQUEST';
export const AUTH_ERROR: 'AUTH_ERROR' = 'AUTH_ERROR';

export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_REQUEST:'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_ERROR: 'LOGOUT_ERROR' = 'LOGOUT_ERROR';

export const UPDATE_TOKEN_SUCCESS:'UPDATE_TOKEN_SUCCESS' = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_REQUEST:'UPDATE_TOKEN_REQUEST' = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_ERROR:'UPDATE_TOKEN_ERROR' = 'UPDATE_TOKEN_ERROR';

export interface IAuthSucessAction {
  readonly type: typeof AUTH_SUCCESS;
}
export interface IAuthRequestAction {
  readonly type: typeof AUTH_REQUEST;
}
export interface IAuthErrorAction {
  readonly type: typeof AUTH_ERROR;
}

export interface ILogoutSucessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutErrorAction {
  readonly type: typeof LOGOUT_ERROR;
}

export interface IUpdateTokenSucessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}
export interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenErrorAction {
  readonly type: typeof UPDATE_TOKEN_ERROR;
}

export type TAuthActions =
  | IAuthSucessAction
  | IAuthRequestAction
  | IAuthErrorAction
  | ILogoutSucessAction
  | ILogoutRequestAction
  | ILogoutErrorAction
  | IUpdateTokenSucessAction
  | IUpdateTokenRequestAction
  | IUpdateTokenErrorAction;

export const signIn: AppThunk = (form) => {
    
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AUTH_REQUEST,
    });
    fetch(`${URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(_checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: AUTH_SUCCESS,
          });
          setCookie('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({
            type: SET_USER,
            user: res.user,
          });
        } else {
          dispatch({
            type: AUTH_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };
}

export const logout: AppThunk = () => {
    
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    fetch(`${URL}/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(_checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
          dispatch({
            type: CLEAR_USER_INFO,
          });
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        } else {
          dispatch({
            type: LOGOUT_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: LOGOUT_ERROR,
        });
      });
  };
}

export const updateToken: AppThunk = () =>  {
    
  return function (dispatch: AppDispatch | AppThunk) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    fetch(`${URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      }),
    })
      .then(_checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: UPDATE_TOKEN_SUCCESS,
          });
          setCookie('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(getUserInfo());
        } else {
          dispatch({
            type: UPDATE_TOKEN_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: UPDATE_TOKEN_ERROR,
        });
      });
  };
}