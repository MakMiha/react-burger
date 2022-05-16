import {
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  TRegisterActions
} from '../actions/register';

type TRegisterState = {
  registerRequest: boolean,
  registerError: boolean,
};

const registerInitialState: TRegisterState = {
  registerRequest: false,
  registerError: false,
};

export const registerReducer = ( state = registerInitialState, action: TRegisterActions ): TRegisterState => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerError: false,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerError: false,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        registerRequest: false,
        registerError: true,
      };
    }
    default: {
      return state;
    }
  }
};