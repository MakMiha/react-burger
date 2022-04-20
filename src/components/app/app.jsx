import React from 'react';
import { 
  Switch, 
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import AppHeader from '../app-header/app-header';
import { 
  Home, 
  Login, 
  Register, 
  ForgotPassword, 
  ResetPassword, 
  Profile,
  Ingredient,
  Feed,
  Order,
  ProfileOrders
} from '../../pages';
import { getIngredients } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';
import { getCookie } from '../../utils/cookie';
import { getUserInfo } from '../../services/actions/get-user-info';
import { updateToken } from '../../services/actions/update-token';

export default function App() {

  const history = useHistory();
  const location = useLocation();
  
  const background = (history.action === 'PUSH' || history.action === 'REPLACE' || history.action === 'POP') && location.state && location.state.background;
  const dispatch = useDispatch();
  const hasAccessToken = (getCookie('accessToken') != null);
  const hasRefreshToken = (localStorage.getItem('refreshToken') != null);
  
  const init = async () => {
     if (hasAccessToken) {
        dispatch(getUserInfo());
    } else if (hasRefreshToken) {
        dispatch(updateToken());
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModal = () => {
    history.goBack();
  };

  return (
    <>
        <AppHeader />
        <Switch location={background || location}>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/register' exact>
            <Register />
          </Route>
          <Route path='/forgot-password' exact>
            <ForgotPassword />
          </Route>
          <Route path='/reset-password' exact>
            <ResetPassword />
          </Route>
          <Route path='/feed' exact>
            <Feed />
          </Route>
          <Route path='/feed/:id' exact>
            <Order path={'feed'}/>
          </Route>
          <ProtectedRoute path='/profile' exact>  
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders' exact> 
            <ProfileOrders />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:id' exact> 
            <Order path={'profile'}/>
          </ProtectedRoute>
          <Route path='/ingredients/:id' exact>
            <Ingredient />
          </Route>
        </Switch>
          {background &&(
            <Route path='/ingredients/:id'>
              <Modal closeModal={closeModal}>
                <IngredientDetails />
              </Modal>
            </Route>
          )}
          {background && (
            <Route path='/profile/orders/:id'>
              <Modal closeModal={closeModal}>
                <OrderInfo modal={true} path={'profile'}/>
              </Modal>
            </Route>
          )}
          {background && (
            <Route path='/feed/:id'>
              <Modal closeModal={closeModal}>
                <OrderInfo modal={true} path={'feed'}/>
              </Modal>
            </Route>
          )}
    </>
  );
}
