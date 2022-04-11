import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { passwordReset } from '../../services/actions/password-reset';
import forgotPassword from './forgot-password.module.css';
import { Link, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export function ForgotPassword() {
  
  const dispatch = useDispatch();
  const [form, setValue] = React.useState({ email: ''});
  const isAuth = useSelector((store) => store.auth.isAuth);
  const passwordResetRequest = useSelector((store) => store.passwordReset.passwordResetRequest);
  const hasAccessCookie = (getCookie('accessToken') != null);
  const hasRefreshToken = (localStorage.getItem('refreshToken') != null);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(passwordReset(form.email));
    },
    [form, dispatch]
  );

  if (isAuth || hasAccessCookie || hasRefreshToken) {
    return (
      <Redirect to={{pathname: '/'}} />
    );
  }

  if (passwordResetRequest) {
    return (
      <Redirect to={{pathname: '/reset-password'}} />
    );
  }

  return (
    <div className={forgotPassword.main}>
      <form className={forgotPassword.form + ' mb-20'} onSubmit={onSubmit}>
        <h1 className={'text text_type_main-large mb-6'}>
          Восстановление пароля
        </h1>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name={'email'} onChange={onChange}/>
        </div>
        <Button type='primary'>Восстановить</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?
        <Link to='/login' className={forgotPassword.link + ' ml-2'} >
          Войти
        </Link>
      </p>
    </div>
  );
}