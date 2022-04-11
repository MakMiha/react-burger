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
import { HIDE_DETAILS_INGREDIENT } from '../../services/actions/ingredient-detail';

export default function App() {

  const history = useHistory();
  let location = useLocation();

  let background = location.state && location.state.background;
  
  const { modalVisible, ingredientData} = useSelector((state) => ({
    modalVisible: state.ingredientDetail.modalVisible,
    ingredientData: state.ingredientDetail.ingredient,
  }));
  
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModal = () => {
    dispatch({
      type: HIDE_DETAILS_INGREDIENT,
    });
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
              {modalVisible && (
                <Modal closeModal={closeModal}>
                  <IngredientDetails data={ingredientData} />
                </Modal>
              )}
            </Route>
          )}
    </>
  );
}
