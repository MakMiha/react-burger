import {URL} from '../../utils/data';
import { _checkResponse } from '../../utils/func';
import { AppDispatch, AppThunk } from '../hooks';
import { TIngredient } from '../../utils/types';

export const GET_INGREDIENTS_SUCCESS:'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

export interface IGetIngredientsSucessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: Array<TIngredient>;
}
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}
export type TIngredientsActions =
  | IGetIngredientsSucessAction
  | IGetIngredientsRequestAction
  | IGetIngredientsErrorAction;

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(`${URL}/ingredients`)
      .then(_checkResponse)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data: res.data,
          });
        } else {
            dispatch({
              type: GET_INGREDIENTS_ERROR,
            });
            return Promise.reject(`Ошибка`);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });
      });
  };
}