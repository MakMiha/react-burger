import React from 'react';
import stylesCostruct from './burger-constructor.module.css';
import {
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Subtract from '../../images/Subtract.svg';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import { postOrder, RESET_ORDER_NUMBER } from '../../services/actions/order';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  RESET_BURGER_CONSTRUCTOR
} from '../../services/actions/constructor';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';
import { useHistory } from 'react-router-dom';
import Preloader from '../preloader/preloader';
import { TIngredient } from '../../utils/types';

export default function BurgerConstructor() {

  const history = useHistory(); 
  const dispatch = useDispatch();
  const { bun, data, user} = useSelector((state) => ({
    bun: state.constructorIngredients.bun,
    data: state.constructorIngredients.constructor,
    user: state.userInfo.user,
  
  }));
  const [modalVisible, setModalVisible] = React.useState(false);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const orderNumberRequest = useSelector((state) => state.order.orderNumberRequest);
  const isUser = user != null;
  const closeModal = () => {
    setModalVisible(false);
    dispatch({
      type: RESET_ORDER_NUMBER,
    });
    dispatch({
      type: RESET_BURGER_CONSTRUCTOR,
    });
  } 
  const order = (data.map((ingredient) => ingredient._id)).concat(bun._id);
  const openModal = () => {
    if (isUser) {
      dispatch(postOrder(order));
      setModalVisible(true);
    } else {
      history.replace({ pathname: '/login' });
    }
  } 

  const initialState = { totalPrice: 0 };
  const [totalPriceState, dispatchTotalPrice] = React.useReducer(reducer, initialState, undefined);
  function reducer() {
    const totalPrice = (data as any[]).reduce((total, ingredient) => total + ingredient.price, 0) + bun.price * 2;
    return totalPrice ? { totalPrice: totalPrice } : { totalPrice: 0 };
  }
  React.useEffect(() => { dispatchTotalPrice() }, [data]);


  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(data: TIngredient) {
      onDropHandler(data);
    },
  });

  const onDropHandler = (ingredient: TIngredient) => {
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

  const moveItem = React.useCallback( (dragIndex: number, hoverIndex: number) => {
    const newData = [...data];
    newData.splice(hoverIndex, 0, newData.splice(dragIndex, 1)[0]);
      dispatch({
        type: MOVE_INGREDIENT,
        data: newData
      })
    }, [data]
  )

  if (orderNumberRequest) {
    return <Preloader />;
  }

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
        <Button type='primary' size='large' disabled={
                      ( bun.name && data.length !=0
                        ? false
                        : true)
                    }  onClick={openModal}>Оформить заказ</Button>
      </div>
      {modalVisible &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      }
    </section>
  );
}