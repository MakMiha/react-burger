import React from 'react';
import stylesCostruct from './burger-constructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Subtract from '../../images/Subtract.svg';

export default function BurgerConstructor(props) {

  const [modalVisible, setModalVisible] = React.useState(false);
  const closeModal = () => {
    setModalVisible(false);
  }
  const openModal = () => {
    setModalVisible(true);
  } 
  
  const bun = props.data.find((ingredient) => ingredient.name === 'Краторная булка N-200i');

  return (
    <section className={stylesCostruct.burgerConstructor + ' pt-25 ml-10'}>
      <ul className={stylesCostruct.list + ' mr-4 ml-4'}>
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
        {props.data.map((ingredient) => { 
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
        <p className='text text_type_digits-medium mr-2'>610</p>
        <img src={Subtract} alt='Валюта' className={stylesCostruct.icon + ' mr-10'}/>
        <Button type='primary' size='large' onClick={openModal}>Оформить заказ</Button>
      </div>
      {modalVisible &&
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      }
    </section>
  );
}


const ingredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
});

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};