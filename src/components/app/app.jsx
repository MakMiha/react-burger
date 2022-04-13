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
  Ingredient
} from '../../pages';
import { getIngredients } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getCookie } from '../../utils/cookie';
import { getUserInfo } from '../../services/actions/get-user-info';
import { updateToken } from '../../services/actions/update-token';

export default function App() {

  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

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
          <ProtectedRoute path='/profile' exact>  
            <Profile />
          </ProtectedRoute>
          <Route path='/ingredients/:id' exact>
            <Ingredient />
          </Route>
        </Switch>
          {background && (
            <Route path='/ingredients/:id'>
              <Modal closeModal={closeModal}>
                <IngredientDetails />
              </Modal>
            </Route>
          )}
    </>
  );
}
