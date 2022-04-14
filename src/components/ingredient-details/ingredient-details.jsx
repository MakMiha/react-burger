import React from 'react';
import stylesIngredient from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {

  const { id } = useParams(); 
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const ingredientData = ingredients.find((ingredient) => ingredient._id === id);

  if (!ingredientData) {
    return null;
  }

  return (
    <><h2 className='text text_type_main-large mt-15 ml-10 mr-10'>Детали ингредиента</h2>
      <div className={stylesIngredient.ingredient}>
        <img src={ingredientData.image_large} alt={ingredientData.name} />
        <h3 className='text text_type_main-medium mt-4 mb-8'>{ingredientData.name}</h3>
        <ul className={stylesIngredient.list + ' mb-15'}>
          <li className={stylesIngredient.listItem}>
            <h4 className='text text_type_main-default'>Калории,ккал</h4>
            <p className='text text_type_digits-default'>{ingredientData.calories}</p>
          </li>
          <li className={stylesIngredient.listItem + ' ml-5'}>
            <h4 className='text  text_type_main-default'>Белки, г</h4>
            <p className='text text_type_digits-default'>{ingredientData.proteins}</p>
          </li>
          <li className={stylesIngredient.listItem + ' ml-5'}>
            <h4 className='text  text_type_main-default'>Жиры, г</h4>
            <p className='text text_type_digits-default'>{ingredientData.fat}</p>
          </li>
          <li className={stylesIngredient.listItem + ' ml-5'}>
            <h4 className='text  text_type_main-default'>Углеводы, г</h4>
            <p className='text text_type_digits-default'>{ingredientData.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </>
  );
}