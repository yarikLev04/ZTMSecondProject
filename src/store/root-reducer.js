import { combineReducers } from 'redux';
import { userReducer } from './user/userReducer';
import { categoryReducer } from './categories/categoryReducer';
import { cartReducer } from './cart/cartReducer';

export const rootReducer = combineReducers({
	user: userReducer,
	categories: categoryReducer,
	cart: cartReducer
});
