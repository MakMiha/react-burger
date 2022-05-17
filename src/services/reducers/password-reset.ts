import {
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_ERROR,
  TPasswordResetActions
} from '../actions/password-reset';

type TPasswordResetState = {
  passwordResetSuccess: boolean,
  passwordResetRequest: boolean,
  passwordResetError: boolean,
};

const passwordResetInitialState: TPasswordResetState = {
  passwordResetSuccess: false,
  passwordResetRequest: false,
  passwordResetError: false,
};

export const passwordResetReducer = ( state = passwordResetInitialState, action: TPasswordResetActions ): TPasswordResetState => {
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