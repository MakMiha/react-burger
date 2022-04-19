import { URL } from '../../utils/data';
import { setCookie } from '../../utils/cookie';
import { getUserInfo } from './get-user-info';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_ERROR = 'AUTH_ERROR';
export const SET_USER = 'SET_USER';

export function signIn(form) {
    
  return function (dispatch) {
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
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