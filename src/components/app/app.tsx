import React from 'react';
import logo from './logo.svg';
import stylesApp from'./app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import URL from '../../utils/data';
import { IngredientsContext } from '../../services/ingredientsContext';

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(`${URL}/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((ingredients) => { 
          setData(ingredients.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <AppHeader />
      <IngredientsContext.Provider value={data}>
        <main className={stylesApp.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </IngredientsContext.Provider>
    </>
  );
}
