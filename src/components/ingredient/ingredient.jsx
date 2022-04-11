import React from 'react';
import stylesIngredient from './ingredient.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_DETAILS_INGREDIENT } from '../../services/actions/ingredient-detail';
import { useDrag } from 'react-dnd';

const Ingredient = ({ data }) => {

  const [count, setCounter] = React.useState();
  const selectedIngredients = useSelector(state => {
    if (data.type === 'bun') {
      return state.constructorIngredients.bun;
    } else {
      return state.constructorIngredients.constructor;
    }
  })
  function getCount() {
    if (data.type === 'bun') {
      if (data._id === selectedIngredients._id) {
        return 1;
      }
    } else {
      return selectedIngredients.filter((ingredient) => ingredient._id === data._id).length;
    }
  }
  React.useEffect(() => {
    setCounter(getCount());
  }, [selectedIngredients, data]);

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();
  
  function onClick() {
    dispatch({
      type: SHOW_DETAILS_INGREDIENT,
      data: data,
    });
    history.push({
      pathname: `/ingredients/${data._id}`,
      state: { background: location },
    });
  }
  
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
  });

  return (
    <li ref={dragRef}  className={stylesIngredient.listItem} onClick={onClick}>
      <div className={stylesIngredient.counter}>
        {!!count && <Counter count={count} size='default' />}
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
  };

export default Ingredient;