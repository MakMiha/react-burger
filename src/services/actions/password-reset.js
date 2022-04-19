import {URL} from '../../utils/data';

export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR';

export function passwordReset(email) {
    
  return function (dispatch) {
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
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