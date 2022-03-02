import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { constructorReducer } from './constructor';
import { ingredientDetailReducer } from './ingredient-detail';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructorIngredients: constructorReducer,
  ingredientDetail: ingredientDetailReducer,
});