import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/register';
import registerStyle from './register.module.css';
import { Link, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export function Register() {

  const dispatch = useDispatch();
  const [form, setValue] = React.useState({ email: '', name: '', password: '' });
  const isAuth = useSelector((store) => store.auth.isAuth);
  const hasAccessCookie = (getCookie('accessToken') != null);
  const hasRefreshToken = (localStorage.getItem('refreshToken') != null);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(form));
    },
    [form, dispatch]
  );

  if (isAuth || hasAccessCookie || hasRefreshToken) {
    return (
      <Redirect to={{pathname: '/'}} />
    );
  }
  return (
    <div className={registerStyle.main}>
      <form className={registerStyle.form + ' mb-20'} onSubmit={onSubmit}>
        <h1 className={'text text_type_main-large mb-6'}>
          Регистрация
        </h1>
        <div className={'mb-6'}>
          <Input placeholder={'Имя'} value={form.name} name={'name'} onChange={onChange}/>
        </div>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name={'email'} onChange={onChange}/>
        </div>
        <div className={'mb-6'}>
          <PasswordInput value={form.password} name={'password'} onChange={onChange}/>
        </div>
        <Button type='primary'>Зарегистрироваться</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        <Link to='/login' className={registerStyle.link + ' ml-2'} >
          Войти
        </Link>
      </p>
    </div>
  );
}