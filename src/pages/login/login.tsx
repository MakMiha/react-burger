import React, {ChangeEvent, FormEvent} from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyle from './login.module.css';
import { signIn } from '../../services/actions/auth';
import { Link, Redirect, useLocation } from 'react-router-dom';

type TLocationState = {
  from : string;
}

export function Login() {

  const [form, setValue] = React.useState({ email: '', password: '' });
  const user = useSelector((store) => store.userInfo.user);
  const isUser = user != null;
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = React.useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(signIn(form));
    },
    [form, dispatch]
  );

  if (isUser) {
    return (
      <Redirect to={location.state?.from  || '/'} />
    );
  }
  return (
    <div className={loginStyle.main}>
      <form className={loginStyle.form + ' mb-20'} onSubmit={onSubmit}>
        <h1 className={'text text_type_main-large mb-6'}>
          Вход
        </h1>
        <div className={'mb-6'}>
          <EmailInput value={form.email} name={'email'} onChange={onChange}/>
        </div>
        <div className={'mb-6'}>
          <PasswordInput value={form.password} name={'password'} onChange={onChange}/>
        </div>
        <Button type='primary'>Войти</Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
          Вы — новый пользователь?
          <Link to='/register' className={loginStyle.link + ' ml-2'} >
            Зарегистрироваться
          </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль?
        <Link to='/forgot-password' className={loginStyle.link + ' ml-2'} >
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}