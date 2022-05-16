import React, {FC} from 'react';
import stylesIngredientsList from './ingredient-list.module.css';
import Ingredient from '../ingredient/ingredient';
import { TIngredient } from '../../utils/types';

type TIngredientsListProps = {
  data: Array<TIngredient>,
  type: string,
}

const IngredientsList: FC<TIngredientsListProps> = ({ data, type }) => {

    return (
      <ul className={stylesIngredientsList.list + ' pl-4 mt-6 mb-10'}>
        {data.map((ingredient: TIngredient) =>
            ingredient.type === type && (
              <Ingredient data={ingredient}  key={ingredient._id}/>
            )
        )}
      </ul>
    );
  };

export default IngredientsList;