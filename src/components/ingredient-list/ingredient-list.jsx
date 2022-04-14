import React from 'react';
import stylesIngredientsList from './ingredient-list.module.css';
import Ingredient from '../ingredient/ingredient';
import ingredientsPropTypes from '../../utils/types';
import PropTypes from 'prop-types';

const IngredientsList = ({ data, type,  }) => {

    return (
      <ul className={stylesIngredientsList.list + ' pl-4 mt-6 mb-10'}>
        {data.map( (ingredient) =>
            ingredient.type === type && (
              <Ingredient data={ingredient}  key={ingredient._id}/>
            )
        )}
      </ul>
    );
  };


  IngredientsList.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    type: PropTypes.string.isRequired,
  };

export default IngredientsList;