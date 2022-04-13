import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import stylesIngridient from './ingredient.module.css';

export function Ingredient() {

  let { id } = useParams(); 
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  let ingredientData = ingredients.find((ingredient) => ingredient._id === id);

  if (!ingredientData) {
    return null;
  }
  return (
    <div className={stylesIngridient.main}>
      <IngredientDetails />
    </div>
  );
}