import { TIngredient } from '../../utils/types';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT:'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const RESET_BURGER_CONSTRUCTOR: 'RESET_BURGER_CONSTRUCTOR' = 'RESET_BURGER_CONSTRUCTOR';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  data: TIngredient;
  uniqId: number;
}
export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  data: TIngredient;
}
export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  data: Array<TIngredient>;
}
export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  data: TIngredient;
}
export interface IResetBurgerConstructorAction {
  readonly type: typeof RESET_BURGER_CONSTRUCTOR;
}
  
export type TConstructorActions =
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IMoveIngredientAction
  | IAddBunAction
  | IResetBurgerConstructorAction;