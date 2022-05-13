import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import feedStyle from './feed.module.css';
import Order from '../../components/order/order';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from '../../services/actions/wsActions';
import { Link, useLocation } from 'react-router-dom';
import Preloader from '../../components/preloader/preloader';

export function Feed() {

  const location = useLocation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      user: false,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  const ordersData = useSelector((store) => store.ws.messages);

  let оrdersDone = [];
  let оrdersCooking= [];
  if (ordersData.orders.length) {
    оrdersDone = ordersData.orders.filter((order) => order.status === 'done');
    оrdersCooking = ordersData.orders.filter((order) => order.status !== 'done');
  }

  if (!ordersData.orders.length) {
    return <Preloader />;
  }

  return (
    <div className={feedStyle.main}>
      <h1 className={'text text_type_main-large'}>Лента заказов</h1>
      <div className={feedStyle.feed}>
        <section className={feedStyle.section}>
          <ul className={feedStyle.ordersList + ' mt-6'}>
            {ordersData.orders.map((order) => {
              return (
                <Link
                  key={order._id}
                  className={feedStyle.linkOrder}
                  to={{
                    pathname: `/feed/${order._id}`,
                    state: { background: location },
                  }}
                >
                  <Order data={order} />
                </Link>
              );
            })}
          </ul>
        </section>
        <section className={feedStyle.section + ' ml-15'}>
          <div className={feedStyle.columns}>
            <div className={feedStyle.column}>
              <p className={'text text_type_main-medium mb-6'}>Готовы:</p>
              <ul className={feedStyle.listDone}>
                {оrdersDone.slice(0, 5).map((order) => {
                    return (
                      <li className={feedStyle.listOrder + ' text text_type_digits-default mb-2'} key={order._id}>{order.number}</li>
                    );
                })}
              </ul>
            </div>
            <div className={feedStyle.column + ' ml-9'}>
              <p className={'text text_type_main-medium mb-6'}>В работе:</p>
              <ul className={feedStyle.list}>
                {оrdersCooking.slice(0, 5).map((order) => {
                    return (
                      <li className={feedStyle.listOrder + ' text text_type_digits-default mb-2'} key={order._id}>{order.number}</li>
                    );
                })}
              </ul>
            </div>
          </div>
          <p className='text text_type_main-medium mt-15'> Выполнено за все время:</p>
          <p className='text text_type_digits-large'>{ordersData.total}</p>
          <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
          <p className='text text_type_digits-large'>{ordersData.totalToday}</p>
        </section>
      </div>
    </div> 
  );
}