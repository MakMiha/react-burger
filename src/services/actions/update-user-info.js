import {URL} from '../../utils/data';
import { getCookie } from '../../utils/cookie';
import { updateToken } from './update-token';

export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_ERROR = 'UPDATE_USER_INFO_ERROR';

export function updateUserInfo(form) {
    
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST,
    });
    fetch(`${URL}/auth/user`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
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