import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { setNewPassword } from '../../services/actions/new-password';
import resetPassword from './reset-password.module.css';
import { Link, Redirect } from 'react-router-dom';

export function ResetPassword() {
  
  const dispatch = useDispatch();
  const [form, setValue] = React.useState({ password: '', token: ''});
  const hasNewPassword = useSelector((store) => store.setNewPassword.hasNewPassword);
  const user = useSelector((store) => store.userInfo.user);
  const isUser = user != null;

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(setNewPassword(form));
    },
    [form, dispatch]
  );

  if (isUser) {
    return (
      <Redirect to={{pathname: '/'}} />
    );
  }

  if (hasNewPassword) {
    return (
      <Redirect to={{pathname: '/login'}} />
    );
  }

  return (
    <div className={resetPassword.main}>
      <form className={resetPassword.form + ' mb-20'} onSubmit={onSubmit}>
        <h1 className={'text text_type_main-large mb-6'}>
          Восстановление пароля
        </h1>
        <div className={'mb-6'}>
          <Input placeholder={'Введите новый пароль'} value={form.password} name={'password'} onChange={onChange}/>
        </div>
        <div className={'mb-6'}>
          <Input placeholder={'Введите код из письма'} value={form.token} name={'token'} onChange={onChange}/>
        </div>
        <Button type='primary'>Сохранить</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?
        <Link to='/login' className={resetPassword.link + ' ml-2'} >
          Войти
        </Link>
      </p>
    </div>
  );
}