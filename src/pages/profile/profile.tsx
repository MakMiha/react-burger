import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyle from './profile.module.css';
import { updateUserInfo } from '../../services/actions/user-info';
import { logout } from '../../services/actions/auth';
import { NavLink, Redirect  } from 'react-router-dom';

export function Profile() {

  const [form, setValue] = React.useState({ name: '', email: '', password: '' });
  const [edit, setEdit] = React.useState(false);
  const user = useSelector((store) => store.userInfo.user);
  const isUser = user != null;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user != null){
      setValue(user);
    }
  }, [user]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setEdit(true);
  };

  const onSubmit = React.useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUserInfo(form));
      setEdit(false);
    },
    [form, dispatch]
  );
  
  const onExit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout());
  }

  const onCancel = (e: ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user != null){
      setValue(user);
    }
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
          <EmailInput value={form.email || ''} name={'email'} onChange={onChange}/>
        </div>
        <div className={'mb-6'}>
          <PasswordInput value={form.password || ''} name={'password'} onChange={onChange}/>
        </div>
        {edit && (
          <Button type='primary'>Сохранить</Button>
        )}
        {edit && (
          <Button onClick={onCancel as () => void} type='secondary'>Отмена</Button>
        )}
      </form>
    </div>
  );
}