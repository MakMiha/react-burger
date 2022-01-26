import React from 'react';
import stylesIngredient from './ingredient.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Ingredient = ({ data, openModal }) => {
    return (
      <li className={stylesIngredient.listItem} onClick={() => openModal(data)}>
        <div className={stylesIngredient.counter}>
          <Counter count={1} size='default' />
        </div>
        <img className={stylesIngredient.image} src={data.image} alt={data.name} />
        <div className={stylesIngredient.price + ' mt-1 mb-1'}>
          <p className='text text_type_digits-default mr-2'>{data.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <h3 className='text text_type_main-default'>{data.name}</h3>
      </li>
    );
  };


  Ingredient.propTypes = {
    data: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired
  };

export default Ingredient;