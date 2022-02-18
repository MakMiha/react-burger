import React from 'react';
import stylesCostruct from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Subtract from '../../images/Subtract.svg';
import ingredientsPropTypes from '../../utils/types';
import { IngredientsContext } from '../../services/ingredientsContext';
import URL from '../../utils/data';

export default function BurgerConstructor() {

  const data = React.useContext(IngredientsContext);
  const initialState = { totalPrice: 0 };
  const [totalPriceState, dispatch] = React.useReducer(reducer, initialState, undefined);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [orderInfo, setOrderInfo] = React.useState({orderNumber: '',});

  const closeModal = () => {
    setModalVisible(false);
  }
  const openModal = () => {
    getOrder();
    setModalVisible(true);
  } 
  
  function reducer() {
    const totalPrice = data.reduce((total, ingredient) => total + ingredient.price, 0);
    return { totalPrice: totalPrice };
  }

  React.useEffect(() => { dispatch() }, [data]);

  function getOrder() {
    const order = data.map((ingredient) => ingredient._id);
    fetch(`${URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: order,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        setOrderInfo({orderNumber: res.order.number})
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const bun = data.find((ingredient) => ingredient.name === 'Краторная булка N-200i');

  return (
    <section className={stylesCostruct.burgerConstructor + ' pt-25 ml-10'}>
      <ul className={stylesCostruct.list + ' pr-4 ml-4'}>
        {bun && (
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
        {data.map((ingredient) => { 
          if (ingredient.type !== 'bun') {
            return (
              <li className={stylesCostruct.listItem + ' mt-4'} key={ingredient._id}>
                <DragIcon type='primary' />
                <ConstructorElement 
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            );}
        })}
      </ul>
      <ul className={stylesCostruct.list + ' pr-4 ml-4'}>
        {bun && (
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
          <OrderDetails orderInfo={orderInfo}/>
        </Modal>
      }
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
// };