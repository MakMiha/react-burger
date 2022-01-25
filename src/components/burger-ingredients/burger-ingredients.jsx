import React from 'react';
import stylesIngredients from './burger-ingredients.module.css';
import {
  Tab,
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function BurgerIngredients(props) {

  const [modalVisible, setModalVisible] = React.useState(false);
  const closeModal = () => {
    setModalVisible(false);
  }

  const [ingredientData, setIngredientData] = React.useState();
  const openModal = ( ingredient ) => {
    setModalVisible(true); 
    setIngredientData(ingredient); 
  } 
  
  
  const Tabs = () => {
    const [current, setCurrent] = React.useState('one');
    return (
      <div className={stylesIngredients.tab + ' mt-5'}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    );
  };
  
  const IngredientsList = ({ data, type }) => {
      return (
        <ul className={stylesIngredients.list + ' pl-4 mt-6 mb-10'}>
          {data.map( (ingredient) =>
              ingredient.type === type && (
                <Ingredient ingredient={ingredient} key={ingredient._id}/>
              )
          )}
        </ul>
      );
    };
  
  const Ingredient = ({ ingredient }) => {
      return (
        <li className={stylesIngredients.listItem} onClick={() => openModal(ingredient)}>
          <div className={stylesIngredients.counter}>
            <Counter count={1} size="default" />
          </div>
          <img className={stylesIngredients.image} src={ingredient.image} alt={ingredient.name} />
          <div className={stylesIngredients.price + ' mt-1 mb-1'}>
            <p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <h3 className='text text_type_main-default'>{ingredient.name}</h3>
        </li>
      );
    };

  return (
    <section className={stylesIngredients.burgerIngredients + ' mt-10'}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <Tabs />
      <div className={stylesIngredients.ingredientsArea + ' mt-10'}>
        <div className='mt-10'>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <IngredientsList data={props.data} type={'bun'} />
        </div>
        <div className='mt-10'>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <IngredientsList data={props.data} type={'sauce'} />
        </div>
        <div className='mt-10'>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <IngredientsList data={props.data} type={'main'} />
        </div>
      </div>
      {modalVisible &&
        <Modal closeModal={closeModal}>
          <IngredientDetails data={ingredientData} />
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
  image_large: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
});
  
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};