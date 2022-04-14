import URL from '../../utils/data';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export function register(form) {
    
  return function (dispatch) {
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
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