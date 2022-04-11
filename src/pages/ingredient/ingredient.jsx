import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import stylesIngridient from './ingredient.module.css';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

export function Ingredient() {

  let { id } = useParams(); 
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  let ingredientData = ingredients.find((ingredient) => ingredient._id === id);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (!ingredientData) {
    return null;
  }
  console.log(ingredients);
  console.log(ingredientData);
  return (
    <div className={stylesIngridient.main}>
      <IngredientDetails data={ingredientData} />
    </div>
  );
}