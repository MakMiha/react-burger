import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { getUserInfo } from '../../services/actions/get-user-info';
import { updateToken } from '../../services/actions/update-token';

export default function ProtectedRoute({ children, ...rest }) {

  const isAuth = useSelector((store) => store.auth.isAuth);
  const isUser = useSelector((store) => store.userInfo.isUser);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const dispatch = useDispatch();
  const hasAccessCookie = (getCookie('accessToken') != null);
  const hasRefreshToken = (localStorage.getItem('refreshToken') != null);

  const init = async () => {
     if (hasAccessCookie) {
        await dispatch(getUserInfo());
        setUserLoaded(true);
    } else if (hasRefreshToken) {
        await dispatch(updateToken());
        setUserLoaded(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (isAuth || isUser) ? (
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