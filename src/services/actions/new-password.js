import {URL} from '../../utils/data';

export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_ERROR = 'SET_NEW_PASSWORD_ERROR';

export function setNewPassword(form) {
    
  return function (dispatch) {
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
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