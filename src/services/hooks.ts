import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from 'react-redux';
import { store} from '../services/store';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TAuthActions } from './actions/auth';
import { TConstructorActions } from './actions/constructor';
import { TIngredientsActions } from './actions/ingredients';
import { TNewPasswordActions } from './actions/new-password';
import { TOrderActions } from './actions/order';
import { TPasswordResetActions } from './actions/password-reset';
import { TRegisterActions } from './actions/register';
import { TUserInfoActions } from './actions/user-info';
import { TwsIActions } from './actions/wsActions';

export type TApplicationActions =
  | TAuthActions
  | TConstructorActions
  | TIngredientsActions
  | TNewPasswordActions
  | TOrderActions
  | TPasswordResetActions
  | TRegisterActions
  | TUserInfoActions
  | TwsIActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; 
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  
export const useDispatch  = () => dispatchHook<AppDispatch | AppThunk>();