import { Redirect, Route, } from 'react-router-dom';
import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';

type TProtectedRouteProps = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) =>{

  const user = useSelector((store) => store.userInfo.user);
  const isUser = user != null;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (isUser) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;