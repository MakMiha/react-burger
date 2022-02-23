import React from 'react';
import stylesIngredients from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Tabs from '../tabs/tabs';
import IngredientsList from '../ingredient-list/ingredient-list';
import { useSelector, useDispatch } from 'react-redux'; 
import { getIngredients } from '../../services/actions/ingredients';
import { HIDE_DETAILS_INGREDIENT } from '../../services/actions/ingredient-detail';

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const { data, ingredientData} = useSelector((state) => ({
    data: state.ingredients.ingredients,
    ingredientData: state.ingredientDetail.ingredient,
  }));
  const [modalVisible, setModalVisible] = React.useState(false);
  const closeModal = () => {
    setModalVisible(false);
    dispatch({
      type: HIDE_DETAILS_INGREDIENT,
    });
  }
  const openModal = ( ) => {
    setModalVisible(true);
  } 

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [current, setCurrent] = React.useState('one');
  const bun = React.useRef(null);
  const sauce = React.useRef(null);
  const main = React.useRef(null);

  const handleScroll = (evt) => {
    let element = evt.target;
    const tab = () => {
      if (element.scrollTop - bun.current.clientHeight < 0) {
        return 'one';
      } else if (element.scrollTop - bun.current.clientHeight - sauce.current.clientHeight < 0) {
        return 'two';
      } else {
        return 'three';
      }
    }
    setCurrent(tab);
  }

  return (
    <section className={stylesIngredients.burgerIngredients + ' mt-10'}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <Tabs current={current} setCurrent={setCurrent}/>
      <div className={stylesIngredients.ingredientsArea + ' mt-10'} onScroll={handleScroll}>
        <div ref={bun} className='mt-10'>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <IngredientsList data={data} type={'bun'} openModal={openModal}/>
        </div>
        <div ref={sauce} className='mt-10'>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <IngredientsList data={data} type={'sauce'} openModal={openModal}/>
        </div>
        <div ref={main} className='mt-10'>
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