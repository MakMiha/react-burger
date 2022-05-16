import { TOrders } from '../../utils/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type TwsActions = {
  wsInit: typeof WS_CONNECTION_START,
  wsSendMessage: typeof WS_SEND_MESSAGE,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR,
  onMessage: typeof WS_GET_MESSAGE
};

export interface IwsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IwsConnectionSucessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IwsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: string;
}

export interface IwsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IwsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TOrders;
}
export interface IwsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: TOrders;
}

export type TwsIActions =
  | IwsConnectionStartAction
  | IwsConnectionSucessAction
  | IwsConnectionErrorAction
  | IwsConnectionClosedAction
  | IwsGetMessageAction
  | IwsSendMessageAction;

export const wsConnectionStart = (): IwsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START
  };
};
export const wsConnectionSuccess = (): IwsConnectionSucessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (message: string): IwsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: message
  };
};

export const wsConnectionClosed = (): IwsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = (message: TOrders): IwsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = (message: TOrders): IwsSendMessageAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};