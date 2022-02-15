import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon,  } from '@ya.praktikum/react-developer-burger-ui-components';

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <nav className={headerStyles.navigation + ' mt-4'}>
          <ul className={headerStyles.list}>
            <li className={headerStyles.button + ' mr-2 ml-4 p-5'}>
              <BurgerIcon type='primary' />
              <p className='text text_type_main-default  ml-2'>Конструктор</p>
            </li>
            <li className={headerStyles.button + ' ml-4 p-5'}>
              <ListIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</p>
            </li>
          </ul>
        </nav>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <a className={headerStyles.button + ' mt-4 p-5'}>
          <ProfileIcon type='secondary' />
          <p className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</p>
        </a>
      </header>
    )
  }
}