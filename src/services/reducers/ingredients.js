import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR
} from '../actions/ingredients';

const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
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