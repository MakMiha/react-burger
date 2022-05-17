import React, {MouseEvent} from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import profileStyle from './profile.module.css';
import { logout } from '../../services/actions/auth';
import { NavLink, Redirect, Link, useLocation  } from 'react-router-dom';
import { 
  WS_CONNECTION_START, 
  WS_CONNECTION_CLOSED
} from '../../services/actions/wsActions'
import Order from '../../components/order/order';
import { TOrder } from '../../utils/types';

export function ProfileOrders() {

  const user = useSelector((store) => store.userInfo.user);
  const isUser = user != null;
  const dispatch = useDispatch();
  const location = useLocation();
  const ordersData = useSelector((store) => store.ws.messages.orders);

  React.useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      user: true,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  
  const onExit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout());
  }

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
          В этом разделе вы можете посмотреть свою историю заказов
        </p>
      </nav>

      <ul className={profileStyle.ordersList}>
        {ordersData.length && ordersData.reverse().map((order) => {
          return (
            <Link
            key={order._id}
            className={profileStyle.linkOrder}
            to={{
              pathname: `/profile/orders/${order._id}`,
              state: { background: location },
            }}
          >
            <Order data={order} />
          </Link>

          )
        })}
       
      </ul>
    </div>
  );
}