import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ProtectedRoute({ children, ...rest }) {

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