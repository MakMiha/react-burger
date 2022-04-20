import {URL} from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { setCookie } from '../../utils/cookie';
import { getUserInfo } from '../actions/get-user-info';

export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_ERROR = 'UPDATE_TOKEN_ERROR';

export function updateToken() {
    
  return function (dispatch) {
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