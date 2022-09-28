import {URL} from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { AppDispatch, AppThunk } from '../hooks';

export const PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS'= 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST'= 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_ERROR: 'PASSWORD_RESET_ERROR'= 'PASSWORD_RESET_ERROR';

export interface IPasswordResetSucessAction {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}
export interface IPasswordResetRequestAction {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}
export interface IPasswordResetErrorAction {
  readonly type: typeof PASSWORD_RESET_ERROR;
}
export type TPasswordResetActions =
  | IPasswordResetSucessAction
  | IPasswordResetRequestAction
  | IPasswordResetErrorAction;

export const passwordReset: AppThunk = (email) => {
    
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    fetch(`${URL}/password-reset`, {
      method: 'POST',
      body: JSON.stringify({ 
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(_checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: PASSWORD_RESET_SUCCESS,
          });
          console.log(res.message);
        } else {
          dispatch({
            type: PASSWORD_RESET_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: PASSWORD_RESET_ERROR,
        });
      });
  };
}