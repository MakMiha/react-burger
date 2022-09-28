import { getShortToken } from '../../utils/cookie';
import { Middleware, MiddlewareAPI } from 'redux';
import { TwsActions} from '../actions/wsActions';

export const socketMiddleware = (wsUrl: string, wsActions: TwsActions): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      if (action.user && type === wsInit ) {
        socket = new WebSocket(`${wsUrl}?token=${getShortToken()}`);
      } else if (type === wsInit){
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
          console.log("Соединение установлено");
        };
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
  
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
  
          dispatch({ type: onMessage, payload: restParsedData });
        };
  
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
  
        if (type === wsSendMessage) {
          const message = getShortToken() ? { ...payload, token: getShortToken() } : { ...payload };;
          socket.send(JSON.stringify(message));
        }
      }
  
      next(action);
    };
  };
};