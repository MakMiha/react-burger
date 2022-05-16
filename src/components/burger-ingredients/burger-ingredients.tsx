import React, { FC } from 'react';
import stylesIngredients from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsList from '../ingredient-list/ingredient-list';
import { useSelector, useDispatch } from '../../services/hooks';

const BurgerIngredients: FC = () => {
  const data = useSelector((state) => state.ingredients.ingredients);

  const [current, setCurrent] = React.useState('one');

  const ingredientContainer = React.createRef<HTMLDivElement>();
  const bun = React.createRef<HTMLDivElement>();
  const sauce = React.createRef<HTMLDivElement>();
  const main = React.createRef<HTMLDivElement>();

  const handleScroll = () => {
    const tab = () => {
      if (ingredientContainer.current!.scrollTop - bun.current!.clientHeight < 0) {
        return 'one';
      } else if (ingredientContainer.current!.scrollTop - bun.current!.clientHeight - sauce.current!.clientHeight < 0) {
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
      <div ref={ingredientContainer} className={stylesIngredients.ingredientsArea + ' mt-10'} onScroll={handleScroll}>
        <div ref={bun} className='mt-10'>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <IngredientsList data={data} type={'bun'} />
        </div>
        <div ref={sauce} className='mt-10'>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <IngredientsList data={data} type={'sauce'} />
        </div>
        <div ref={main} className='mt-10'>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <IngredientsList data={data} type={'main'} />
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;