import React, { FC } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderInfoStyle from './order-info.module.css';
import { useParams } from 'react-router-dom';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from '../../services/actions/wsActions';
import { getCreatedDate } from '../../utils/func';
import Preloader from '../preloader/preloader';
import { TIngredient, TOrder } from '../../utils/types';

type TOrderInfoProps = {
  modal: boolean,
  path: string,
}

const OrderInfo: FC<TOrderInfoProps> = ({ modal, path }) => { 

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const allOrdersData = useSelector((store) => store.ws.messages.orders);
  const ingredientsData = useSelector( (store) => store.ingredients.ingredients ); 

  let ingredientsUsed: Array<TIngredient> = [];
  let price: number = 0;
  let status: string = '';
  let number: number = 0;
  let name: string = '';
  let createdDate: string = '';
  if (allOrdersData.length && ingredientsData.length) {
    const orderData = allOrdersData.find((order) => order._id === id);
    if (orderData) {
      ingredientsUsed = ingredientsData.filter((ingredient) => orderData.ingredients.includes(ingredient._id));

      price = ingredientsUsed.reduce((price, ingredient) => price + (ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price), 0);
    
      status = orderData?.status === 'done' ? 'Выполнен' : orderData?.status === 'created'
        ? 'Создан' : orderData?.status === 'pending' ? 'Готовится' : '';

      number = orderData.number;
      name = orderData.name;
      createdDate = orderData.createdAt;
    }
  }
  
  React.useEffect(() => {
    if (path === 'feed') {
      dispatch({ 
        type: WS_CONNECTION_START,
        user: false,
      });
    } else if (path === 'profile') {
      dispatch({ 
        type: WS_CONNECTION_START,
        user: true,
      });
    }
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);
  
  if (!ingredientsData) {
    return <Preloader />;
  }
  if (!allOrdersData.length) {
    return <Preloader />;
  }

  return (
    <div className={orderInfoStyle.order + ' mt-15 ml-10 mb-10 mr-10'} >
      <p className={'text text_type_digits-default ' + ( modal ? '' : orderInfoStyle.orderNumber) }>#{number}</p>
      <h3 className={'text text_type_main-medium mt-10 mb-3'}>{name}</h3>
      <p className={orderInfoStyle.orderStatus + ' text text_type_main-small'}>
        {status}
      </p>
      <p className={'text text_type_main-medium mt-15 mb-6'}>Состав:</p>
      <ul className={orderInfoStyle.inredients}>
        {ingredientsUsed.map((ingredient: TIngredient, index: number) => {
          return (
            <li key={index} className={orderInfoStyle.inredient + ' mr-6 mb-4'}>
              <div className={orderInfoStyle.box}>
                <div className={orderInfoStyle.image} style={{ backgroundImage: `url(${ingredient.image_mobile})` }} >
                </div>
                <p className={'text text_type_main-default ml-4 mr-4'}>
                    {ingredient.name}
                </p>
              </div>
              <div className={orderInfoStyle.price} >
                <p className={'text text_type_digits-defaultt mr-2'} >
                  {`${ingredient.type === 'bun' ? '2 x ' : '1 x '}${ingredient.price}`}
                </p>
                <CurrencyIcon type='primary' />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={orderInfoStyle.box + ' mt-10'}>
        <p className={'text text_type_main-default text_color_inactive'}>{getCreatedDate(createdDate)}</p>
        <div className={orderInfoStyle.price}>
          <p className={'text text_type_digits-default mr-2'}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;