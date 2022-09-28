import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_ERROR,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_ERROR,
  CLEAR_USER_INFO,
  SET_USER,
  TUserInfoActions
} from '../actions/user-info';

import { TUserInfo } from '../../utils/types';

type TUserInfoState = {
  user: TUserInfo | null,
  getUserInfoRequest: boolean,
  getUserInfoError: boolean,
  updateUserInfoRequest: boolean,
  updateUserInfoError: boolean,
};

const userInfoInitialState: TUserInfoState = {
  user: null,
  getUserInfoRequest: false,
  getUserInfoError: false,
  updateUserInfoRequest: false,
  updateUserInfoError: false,
};

export const userInfoReducer = ( state = userInfoInitialState, action: TUserInfoActions ): TUserInfoState => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        getUserInfoRequest: false,
        getUserInfoError: false,
        user: action.user,
      };
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        getUserInfoRequest: true,
        getUserInfoError: false,
      };
    }
    case GET_USER_INFO_ERROR: {
      return {
        ...state,
        getUserInfoRequest: false,
        getUserInfoError: true,
      };
    }
    case UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        updateUserInfoRequest: false,
        updateUserInfoError: false,
        user: action.user,
      };
    }
    case UPDATE_USER_INFO_REQUEST: {
      return {
        ...state,
        updateUserInfoRequest: true,
        updateUserInfoError: false,
      };
    }
    case UPDATE_USER_INFO_ERROR: {
      return {
        ...state,
        updateUserInfoRequest: false,
        updateUserInfoError: true,
      };
    }
    case CLEAR_USER_INFO: {
      return {
        ...state,
        user: null,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return state;
    }
  }
};