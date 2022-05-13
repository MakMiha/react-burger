import React from 'react';
import stylesOrder from './order-details.module.css';
import doneImage from '../../images/done.svg';
import PropTypes from 'prop-types';

export default function OrderDetails({orderNumber}) {

  return (
    <div className={stylesOrder.order + ' mt-30'}>
      <p className={stylesOrder.orderNumber + ' text text_type_digits-large'}>{orderNumber}</p>
      <p className='text text_type_main-medium mt-8 mb-15'>идентификатор заказа</p>
      <img src={doneImage} alt='Заказ сделан' className={stylesOrder.done}/>
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <p className={stylesOrder.text + ' text text_type_main-default mt-2 mb-30'}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};