import {URL} from '../../utils/data';
import { getCookie } from '../../utils/cookie';
import { updateToken } from './update-token';

export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

export function getUserInfo() {
    
  return function (dispatch) {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
    fetch(`${URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken'),
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
          dispatch(getUserInfo());
        }
      });
  };
}