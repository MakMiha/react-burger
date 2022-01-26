import React from 'react';
import stylesIngredient from './ingredient-details.module.css';
import PropTypes from 'prop-types';

export default function IngredientDetails({data}) {
  return (
    <><h2 className='text text_type_main-large mt-15 ml-10 mr-10'>Детали ингредиента</h2>
      <div className={stylesIngredient.ingredient}>
        <img src={data.image_large} alt={data.name} />
        <h3 className='text text_type_main-medium mt-4 mb-8'>{data.name}</h3>
        <ul className={stylesIngredient.list + ' mb-15'}>
          <li className={stylesIngredient.listItem}>
            <h4 className='text text_type_main-default'>Калории,ккал</h4>
            <p className='text text_type_digits-default'>{data.calories}</p>
          </li>
          <li className={stylesIngredient.listItem + ' ml-5'}>
            <h4 className='text  text_type_main-default'>Белки, г</h4>
            <p className='text text_type_digits-default'>{data.proteins}</p>
          </li>
          <li className={stylesIngredient.listItem + ' ml-5'}>
            <h4 className='text  text_type_main-default'>Жиры, г</h4>
            <p className='text text_type_digits-default'>{data.fat}</p>
          </li>
          <li className={stylesIngredient.listItem + ' ml-5'}>
            <h4 className='text  text_type_main-default'>Углеводы, г</h4>
            <p className='text text_type_digits-default'>{data.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.object.isRequired,
};