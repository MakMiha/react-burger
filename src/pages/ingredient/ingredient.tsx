import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import stylesIngridient from './ingredient.module.css';
import Preloader from '../../components/preloader/preloader';

export function Ingredient() {

  const { id } = useParams<{ id: string }>(); 
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const ingredientData = ingredients.find((ingredient) => ingredient._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }
  return (
    <div className={stylesIngridient.main}>
      <IngredientDetails />
    </div>
  );
}