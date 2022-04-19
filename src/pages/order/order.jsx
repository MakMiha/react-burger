import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import orderInfoStyle from './order.module.css';
import {
  WS_CONNECTION_START,
} from '../../services/actions/wsActions';
import OrderInfo from '../../components/order-info/order-info';

export function Order() {   

  const allOrdersData = useSelector((store) => store.ws.messages);
  const ingredientsData = useSelector( (store) => store.ingredients.ingredients );
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!allOrdersData.orders.length) {
      dispatch({
        type: WS_CONNECTION_START,
        user: false,
      });
    }
  }, [dispatch]);

  if (!ingredientsData) {
    return null;
  }
  if (!allOrdersData.orders.length) {
    return null;
  }

  return (
    <div className={orderInfoStyle.main} >
      <OrderInfo modal={false}/>
    </div>
  );
}