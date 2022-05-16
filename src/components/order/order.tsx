import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import orderStyle from './order.module.css';
import { getCreatedDate } from '../../utils/func';
import { TIngredient, TOrder } from '../../utils/types';

type TOrderProps = {
  data: TOrder,
}

const Order: FC<TOrderProps> = ({ data }) => {

  const ingredientsData = useSelector( (store) => store.ingredients.ingredients );
  const ingredientsUsed = ingredientsData.filter((ingredient: TIngredient) => data.ingredients.includes(ingredient._id));

  const price = ingredientsUsed.reduce((price: number, ingredient: TIngredient) => price + (ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price), 0);

  return (
    <li className={orderStyle.order + ' p-6 mr-2 mb-4'} >
      <div className={orderStyle.box}>
        <p className={'text text_type_digits-default'}>#{data.number}</p>
        <p className={'text text_type_main-default text_color_inactive'}>{getCreatedDate(data.createdAt)}</p>
      </div>
      <h3 className={'text text_type_main-medium mt-6 mb-6'}>{data.name}</h3>
      <div className={orderStyle.box}>
        <div className={orderStyle.ingredients + ' pl-6'}>
          {ingredientsUsed && ingredientsUsed.reverse().map((ingredient: TIngredient, index: number) => {
            if(index >= 6) return;
            let rest;
            if (index === 0 && ingredientsUsed.length > 6) {
               rest = '+' + (ingredientsUsed.length - 5);
            }
            return (
              <div className={orderStyle.image} style={{ backgroundImage: `url(${ingredient.image_mobile})` }} key={index}>
                {rest && (
                  <p className={orderStyle.rest + ' text text_type_main-default'}>{rest} </p>
                )}
              </div>
            );
          })}
        </div>
        <div className={orderStyle.price}>
          <p className={'text text_type_digits-default mr-2'}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </li>
  );
}

export default Order;