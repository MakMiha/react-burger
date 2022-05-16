import {URL} from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { getCookie } from '../../utils/cookie';
import { updateToken } from './auth';
import { AppDispatch, AppThunk } from '../hooks';
import { TUserInfo } from '../../utils/types';

export const GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS' = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST' = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_ERROR: 'GET_USER_INFO_ERROR' = 'GET_USER_INFO_ERROR';

export const UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS' = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_REQUEST: 'UPDATE_USER_INFO_REQUEST' = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_ERROR: 'UPDATE_USER_INFO_ERROR' = 'UPDATE_USER_INFO_ERROR';

export const SET_USER: 'SET_USER' = 'SET_USER';
export const CLEAR_USER_INFO: 'CLEAR_USER_INFO' = 'CLEAR_USER_INFO';

export interface IGetUserSucessAction {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  user: TUserInfo;
}
export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_INFO_REQUEST;
}
export interface IGetUserErrorAction {
  readonly type: typeof GET_USER_INFO_ERROR;
}

export interface IUpdateUserInfoSucessAction {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS;
  user: TUserInfo;
}
export interface IUpdateUserInfoRequestAction {
  readonly type: typeof UPDATE_USER_INFO_REQUEST;
}
export interface IUpdateUserInfoErrorAction {
  readonly type: typeof UPDATE_USER_INFO_ERROR;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  user: TUserInfo;
}

export interface IClearUserInfoAction {
  readonly type: typeof CLEAR_USER_INFO;
}

export type TUserInfoActions =
  | IGetUserSucessAction
  | IGetUserRequestAction
  | IGetUserErrorAction
  | IUpdateUserInfoSucessAction
  | IUpdateUserInfoRequestAction
  | IUpdateUserInfoErrorAction
  | ISetUserAction
  | IClearUserInfoAction;

export const getUserInfo: AppThunk = () => {
    
  return function (dispatch: AppDispatch | AppThunk) {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
    fetch(`${URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken') as string,
      },
    })
      .then(_checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_USER_INFO_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: GET_USER_INFO_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_INFO_ERROR,
        });
        if (err === 'Ошибка 403') {
          dispatch(updateToken());
        }
      });
  };
}

export const updateUserInfo: AppThunk = (form) => {
    
  return function (dispatch: AppDispatch | AppThunk) {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST,
    });
    fetch(`${URL}/auth/user`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken') as string,
      },
    })
      .then(_checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: UPDATE_USER_INFO_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: UPDATE_USER_INFO_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: UPDATE_USER_INFO_ERROR,
        });
        if (err === 'Ошибка 403') {
          dispatch(updateToken());
          dispatch(updateUserInfo());
        }
      });
  };
}