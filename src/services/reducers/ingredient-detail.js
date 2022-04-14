import {
  SHOW_DETAILS_INGREDIENT,
  HIDE_DETAILS_INGREDIENT,
} from '../actions/ingredient-detail';

const ingredientDetailInitialState = {
  ingredient: {},
  modalVisible: false,
};

export const ingredientDetailReducer = (state = ingredientDetailInitialState, action) => {
  switch (action.type) {
    case SHOW_DETAILS_INGREDIENT: {
      return {
        ...state,
        ingredient: action.data,
        modalVisible: true,
      };
    }
    case HIDE_DETAILS_INGREDIENT: {
      return {
        ...state,
        ingredient: {},
        modalVisible: false,
      };
    }
    default: {
      return state;
    }
  }
};