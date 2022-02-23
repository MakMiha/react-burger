import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  ADD_BUN
} from '../actions/constructor';
  
const constructorInitialState = {
  constructor: [],
  bun: {}
};
  
export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructor: [
          ...state.constructor,
          { ...action.data, uniqId: action.uniqId },
        ],
     };
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        constructor: action.data,
      };
    }  
    case ADD_BUN: {
      return {
          ...state,
          bun: action.data, 
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructor: [...state.constructor].filter(
          (data) => data.uniqId !== action.data.uniqId
        ),
      };
    }
    default: {
      return state;
    }
  }
};