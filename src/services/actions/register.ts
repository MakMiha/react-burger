import {URL} from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { AppDispatch, AppThunk } from '../hooks';

export const REGISTER_SUCCESS:'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_REQUEST:'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_ERROR:'REGISTER_ERROR' = 'REGISTER_ERROR';

export interface IRegisterSucessAction {
  readonly type: typeof REGISTER_SUCCESS;
}
export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterErrorAction {
  readonly type: typeof REGISTER_ERROR;
}
export type TRegisterActions =
  | IRegisterSucessAction
  | IRegisterRequestAction
  | IRegisterErrorAction;

export const register: AppThunk = (form) =>  {
    
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    fetch(`${URL}/auth/register`, {
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
            type: REGISTER_SUCCESS,
          });
        } else {
          dispatch({
            type: REGISTER_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: REGISTER_ERROR,
        });
      });
  };
}