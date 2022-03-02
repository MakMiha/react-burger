import {
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_ERROR,
  RESET_ORDER_NUMBER
} from '../actions/order';

const orderInitialState = {
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberError: false,
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberRequest: false,
        orderNumberError: false,
      };
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true,
        orderNumberError: false,
      };
    }
    case GET_ORDER_NUMBER_ERROR: {
      return {
        ...state,
        orderNumber: null,
        orderNumberRequest: false,
        orderNumberError: true,
      };
    }
    case RESET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: null,
      };
    }
    default: {
        return state;
      }
  }
};