import { Redirect, Route, RouteProps } from 'react-router-dom';
import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) =>{

  const user = useSelector((store) => store.userInfo.user);
  const isUser = user != null;

  if (!isUser) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }: any) =>
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