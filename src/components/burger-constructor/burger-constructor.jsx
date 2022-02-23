import React from 'react';
import stylesCostruct from './burger-constructor.module.css';
import {
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Subtract from '../../images/Subtract.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { postOrder } from '../../services/actions/order';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
} from '../../services/actions/constructor';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';

export default function BurgerConstructor() {

  const dispatch = useDispatch();
  const { bun, data} = useSelector((state) => ({
    bun: state.constructorIngredients.bun,
    data: state.constructorIngredients.constructor,
  }));
  const [modalVisible, setModalVisible] = React.useState(false);
  const orderNumber = useSelector((state) => state.order.orderNumber);

  const closeModal = () => {
    setModalVisible(false);
  }
  const order = (data.map((ingredient) => ingredient._id)).concat(bun._id);
  const openModal = () => {
    dispatch(postOrder(order));
    setModalVisible(true);
  } 
  
  const initialState = { totalPrice: 0 };
  const [totalPriceState, dispatchTotalPrice] = React.useReducer(reducer, initialState, undefined);
  function reducer() {
    const totalPrice = data.reduce((total, ingredient) => total + ingredient.price, 0) + bun.price * 2;
    return totalPrice ? { totalPrice: totalPrice } : { totalPrice: 0 };
  }
  React.useEffect(() => { dispatchTotalPrice() }, [data]);


  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(data) {
      onDropHandler(data);
    },
  });

  const onDropHandler = (ingredient) => {
    if (ingredient.type === 'bun') {
      dispatch({
        type: ADD_BUN,
        data: ingredient
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        data: ingredient,
        uniqId: Math.random() * 1000,
      });
    }
  };

  const moveItem = React.useCallback( (dragIndex, hoverIndex) => {
    const newData = [...data];
    newData.splice(hoverIndex, 0, newData.splice(dragIndex, 1)[0]);
      dispatch({
        type: MOVE_INGREDIENT,
        data: newData
      })
    }, [data]
  )

  return (
    <section ref={dropTarget} className={stylesCostruct.burgerConstructor + ' pt-25 ml-10'}>
      <ul className={stylesCostruct.list + ' pr-4 ml-4'}>
        {bun.name && (
          <li className={stylesCostruct.listItem + ' mt-4'} >
            <ConstructorElement 
              text={bun.name + ' (верх)'}
              type='top'
              isLocked={true}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        )}
      </ul>
      <ul className={stylesCostruct.listMain + ' pr-2 ml-4'}>
        {data.map((ingredient, index) => { 
          if (ingredient.type !== 'bun') {
            return (
              <IngredientConstructor
                data={ingredient}
                index={index}
                key={ingredient.uniqId}
                moveItem={moveItem}
              />
            );}
        })}
      </ul>
      <ul className={stylesCostruct.list + ' pr-4 ml-4'}>
        {bun.name && (
          <li className={stylesCostruct.listItem + ' mt-4'} >
            <ConstructorElement 
              text={bun.name + ' (низ)'}
              type='bottom'
              isLocked={true}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        )}
      </ul>
      <div className={stylesCostruct.order + ' mt-10 mr-4'}>
        <p className='text text_type_digits-medium mr-2'>{totalPriceState.totalPrice}</p>
        <img src={Subtract} alt='Валюта' className={stylesCostruct.icon + ' mr-10'}/>
        <Button type='primary' size='large' onClick={openModal}>Оформить заказ</Button>
      </div>
      {modalVisible &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      }
    </section>
  );
}