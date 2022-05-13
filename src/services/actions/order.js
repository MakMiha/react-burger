import {URL} from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { getCookie } from '../../utils/cookie';

export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_ERROR = 'GET_ORDER_NUMBER_ERROR';
export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER';

export function postOrder(order) {
    
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });
    fetch(`${URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: order,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken'),
      },
    })
      .then(_checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            orderNumber: res.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_NUMBER_ERROR,
          });
          return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: GET_ORDER_NUMBER_ERROR,
        });
      });
  };
}