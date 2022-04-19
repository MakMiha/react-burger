import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { constructorReducer } from './constructor';
import { ingredientDetailReducer } from './ingredient-detail';
import { authReducer } from './auth';
import { registerReducer } from './register';
import { passwordResetReducer } from './password-reset';
import { setNewPasswordReducer } from './new-password';
import { userInfoReducer } from './user-info';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructorIngredients: constructorReducer,
  ingredientDetail: ingredientDetailReducer,
  auth: authReducer,
  register: registerReducer,
  passwordReset: passwordResetReducer,
  setNewPassword: setNewPasswordReducer,
  userInfo: userInfoReducer,
  ws: wsReducer,
});