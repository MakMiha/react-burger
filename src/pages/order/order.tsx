import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import orderInfoStyle from './order.module.css';
import OrderInfo from '../../components/order-info/order-info';

type TOrderProps = {
  path: string,
}

const Order: FC<TOrderProps> = ({ path }) => {   

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

export default Order;