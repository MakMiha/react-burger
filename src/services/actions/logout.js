import {URL} from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { deleteCookie } from '../../utils/cookie';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export function logout() {
    
  return function (dispatch) {
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