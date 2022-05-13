import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import orderInfoStyle from './order.module.css';
import OrderInfo from '../../components/order-info/order-info';

export function Order({path}) {   

  const ingredientsData = useSelector( (store) => store.ingredients.ingredients );

  if (!ingredientsData) {
    return null;
  }
  return (
    <div className={orderInfoStyle.main} >
      <OrderInfo modal={false} path={path}/>
    </div>
  );
}