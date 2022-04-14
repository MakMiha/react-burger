import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyle from './profile.module.css';
import { updateUserInfo } from '../../services/actions/update-user-info';
import { logout } from '../../services/actions/logout';
import { NavLink, Redirect  } from 'react-router-dom';

export function Profile() {

  const [form, setValue] = React.useState({ name: '', email: '', password: '' });
  const [edit, setEdit] = React.useState(false);
  const user = useSelector((store) => store.userInfo.user);
  const isUser = user != null;
  const dispatch = useDispatch();

  React.useEffect(() => {
    setValue(user);
  }, [user]);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setEdit(true);
  };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUserInfo(form));
      setEdit(false);
    },
    [form, dispatch]
  );
  
  const onExit = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  const onCancel = (e) => {
    e.preventDefault();
    setValue(user);
    setEdit(false);
  };

  if (!isUser) {
    return (
      <Redirect to={{pathname: '/login'}} />
    );
  }

  return (
    <div className={profileStyle.main}>
      <nav className={profileStyle.nav}>
        <NavLink
          to={{ pathname: `/profile` }}
          exact
          className={profileStyle.link + ' text text_type_main-medium'}
          activeClassName={profileStyle.activeLink}
        >
          Профиль
        </NavLink>
        <NavLink
          to={{ pathname: `/profile/orders` }}
          exact
          className={profileStyle.link + ' text text_type_main-medium'}
          activeClassName={profileStyle.activeLink}
        >
          История заказов
        </NavLink>
        <button className={profileStyle.logout + ' text text_type_main-medium'} onClick={onExit}>
          Выход
        </button>
        <p className={profileStyle.text + ' mt-20 text text_type_main-default text_color_inactive'}>
          В этом разделе вы можете изменить свои персональные данные 
        </p>
      </nav>
      <form className={profileStyle.form + ' ml-15 mb-20'} onSubmit={onSubmit}>
        <div className={'mb-6'}>
          <Input placeholder={'Имя'} value={form.name || ''} name={'name'} onChange={onChange}/>
        </div>
        <div className={'mb-6'}>
          <EmailInput placeholder={'Логин'} value={form.email || ''} name={'email'} onChange={onChange}/>
        </div>
        <div className={'mb-6'}>
          <PasswordInput placeholder={'Пароль'} value={form.password || ''} name={'password'} onChange={onChange}/>
        </div>
        {edit && (
          <Button type='primary'>Сохранить</Button>
        )}
        {edit && (
          <Button onClick={onCancel} type='secondary'>Отмена</Button>
        )}
      </form>
    </div>
  );
}