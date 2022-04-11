import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_ERROR,
} from '../actions/get-user-info';

import {
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_ERROR,
} from '../actions/update-user-info';

const userInfoInitialState = {
  user: {
    email: '',
    name: '',
    password: '',
  },
  getUserInfoRequest: false,
  getUserInfoError: false,
  isUser: false,
  updateUserInfoRequest: false,
  updateUserInfoError: false,
};

export const userInfoReducer = ( state = userInfoInitialState, action ) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        getUserInfoRequest: false,
        getUserInfoError: false,
        isUser: true,
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
    default: {
      return state;
    }
  }
};