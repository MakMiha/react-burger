import PropTypes from 'prop-types';

export const ingredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
});

export type TIngredient = {
  _id: string;
  type: string;
  image: string;
  image_mobile: string;
  image_large: string;
  name: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  __v: number;
  uniqId?: number;
}

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string; 
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type TUserInfo = {
  password: string;
  email: string;
  name: string;
};

export type TOrders = {
  success: boolean,
  orders: Array<TOrder>,
  total: number,
  totalToday: number,
}