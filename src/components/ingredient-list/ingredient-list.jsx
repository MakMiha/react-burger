import React from 'react';
import stylesIngredientsList from './ingredient-list.module.css';
import Ingredient from '../ingredient/ingredient';
import ingredientsPropTypes from '../../utils/types';
import PropTypes from 'prop-types';

const IngredientsList = ({ data, type, openModal }) => {
    return (
      <ul className={stylesIngredientsList.list + ' pl-4 mt-6 mb-10'}>
        {data.map( (ingredient) =>
            ingredient.type === type && (
              <Ingredient data={ingredient} openModal={openModal} key={ingredient._id}/>
            )
        )}
      </ul>
    );
  };


  IngredientsList.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    type: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
  };

export default IngredientsList;