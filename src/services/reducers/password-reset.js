import {
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_ERROR,
} from '../actions/password-reset';

const passwordResetInitialState = {
  passwordResetSuccess: false,
  passwordResetRequest: false,
  passwordResetError: false,
};

export const passwordResetReducer = ( state = passwordResetInitialState, action ) => {
  switch (action.type) {
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: true,
        passwordResetError: false,
      };
    }
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetSuccess: false,
        passwordResetError: false,
      };
    }
    case PASSWORD_RESET_ERROR: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: false,
        passwordResetError: true,
      };
    }
    default: {
      return state;
    }
  }
};