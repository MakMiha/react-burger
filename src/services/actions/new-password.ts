import {URL} from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { AppDispatch, AppThunk } from '../hooks';

export const SET_NEW_PASSWORD_SUCCESS: 'SET_NEW_PASSWORD_SUCCESS' = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_REQUEST: 'SET_NEW_PASSWORD_REQUEST' = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_ERROR: 'SET_NEW_PASSWORD_ERROR' = 'SET_NEW_PASSWORD_ERROR';

export interface ISetNewPasswordSucessAction {
  readonly type: typeof SET_NEW_PASSWORD_SUCCESS;
}
export interface ISetNewPasswordRequestAction {
  readonly type: typeof SET_NEW_PASSWORD_REQUEST;
}
export interface ISetNewPasswordErrorAction {
  readonly type: typeof SET_NEW_PASSWORD_ERROR;
}
export type TNewPasswordActions =
  | ISetNewPasswordSucessAction
  | ISetNewPasswordRequestAction
  | ISetNewPasswordErrorAction;

export const setNewPassword: AppThunk = (form) => {
    
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_NEW_PASSWORD_REQUEST,
    });
    fetch(`${URL}/password-reset/reset`, {
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
            type: SET_NEW_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: SET_NEW_PASSWORD_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: SET_NEW_PASSWORD_ERROR,
        });
      });
  };
}