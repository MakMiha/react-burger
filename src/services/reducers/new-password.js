import {
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_ERROR,
} from '../actions/new-password';

const setNewPasswordInitialState = {
  setNewPasswordRequest: false,
  setNewPasswordError: false,
  hasNewPassword: false,
};

export const setNewPasswordReducer = ( state = setNewPasswordInitialState, action ) => {
  switch (action.type) {
    case SET_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        setNewPasswordRequest: false,
        setNewPasswordError: false,
        hasNewPassword: true,
      };
    }
    case SET_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
        setNewPasswordRequest: true,
        setNewPasswordError: false,
        hasNewPassword: false,
      };
    }
    case SET_NEW_PASSWORD_ERROR: {
      return {
        ...state,
        setNewPasswordRequest: false,
        setNewPasswordError: true,
        hasNewPassword: false,
      };
    }
    default: {
      return state;
    }
  }
};