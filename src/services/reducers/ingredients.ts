import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  TIngredientsActions
} from '../actions/ingredients';
import { TIngredient } from '../../utils/types';

type TIngredientsState = {
  ingredients: Array<TIngredient>,
  ingredientsRequest: boolean,
  ingredientsError: boolean,
};

const ingredientsInitialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.data,
        ingredientsRequest: false,
        ingredientsError: false,
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsError: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredients: [],
        ingredientsError: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};