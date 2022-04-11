import {
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_ERROR,
} from '../actions/register';

const registerInitialState = {
  registerRequest: false,
  registerError: false,
};

export const registerReducer = ( state = registerInitialState, action ) => {
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