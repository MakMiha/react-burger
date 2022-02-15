import React from 'react';
import stylesIngredients from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ingredientsPropTypes from '../../utils/types';
import Tabs from '../tabs/tabs';
import IngredientsList from '../ingredient-list/ingredient-list';

export default function BurgerIngredients({data}) {

  const [modalVisible, setModalVisible] = React.useState(false);
  const closeModal = () => {
    setModalVisible(false);
  }

  const [ingredientData, setIngredientData] = React.useState();
  const openModal = ( ingredient ) => {
    setModalVisible(true); 
    setIngredientData(ingredient); 
  } 

  return (
    <section className={stylesIngredients.burgerIngredients + ' mt-10'}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <Tabs />
      <div className={stylesIngredients.ingredientsArea + ' mt-10'}>
        <div className='mt-10'>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <IngredientsList data={data} type={'bun'} openModal={openModal}/>
        </div>
        <div className='mt-10'>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <IngredientsList data={data} type={'sauce'} openModal={openModal}/>
        </div>
        <div className='mt-10'>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <IngredientsList data={data} type={'main'} openModal={openModal}/>
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
  
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};