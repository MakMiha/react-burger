import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon,  } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export default function AppHeader() {
  
    return (
      <header className={headerStyles.header}>
        <nav className={headerStyles.navigation + ' mt-4'}>
          <ul className={headerStyles.list}>
            <li className={headerStyles.button + ' mr-2 ml-4 p-5'}>
              <Link className={headerStyles.link}  to='/'>
                <BurgerIcon type={window.location.pathname === '/' ? 'primary' : 'secondary'} />
                <p  className={
                      ( window.location.pathname === '/'
                        ? ' '
                        : 'text_color_inactive') +
                      ' text text_type_main-default ml-2'
                    }>Конструктор</p>
              </Link>
            </li>
            <li className={headerStyles.button + ' ml-4 p-5'}>
              <Link className={headerStyles.link}  to='/feed'>
                <ListIcon type={window.location.pathname === '/feed' ? 'primary' : 'secondary'} />
                <p className={
                      ( window.location.pathname === '/feed'
                        ? ' '
                        : 'text_color_inactive') +
                      ' text text_type_main-default ml-2'
                    }>Лента заказов</p>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <a className={headerStyles.button + ' mt-4 p-5'}>
          <Link className={headerStyles.link} to='/profile'>
            <ProfileIcon type={window.location.pathname === '/profile' ? 'primary' : 'secondary'} />
            <p className={
                      ( window.location.pathname === '/profile'
                        ? ' '
                        : 'text_color_inactive') +
                      ' text text_type_main-default ml-2'
                    }>Личный кабинет</p>
          </Link>
        </a>
      </header>
    )
  
}