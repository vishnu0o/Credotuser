import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { authLoginReducer } from "./Redux/Reducer/AuthReducer";
import {
  productFindOneReducer,
  productFindReducer,
} from "./Redux/Reducer/ProductReducer";
import { orderCreateReducer, orderFindReducer } from "./Redux/Reducer/orderReducer";
import {
  cartCreateReducer,
  cartFindReducer,
  cartUpdateReducer,
} from "./Redux/Reducer/cartReducer";

let Middleware = [thunk];

const appReducer = combineReducers({
  authLogin: authLoginReducer,
  productFind: productFindReducer,
  productFindOne: productFindOneReducer,
  orderCreate: orderCreateReducer,
  cartCreate: cartCreateReducer,
  cartFind: cartFindReducer,
  cartUpdate:cartUpdateReducer,
  orderFind:orderFindReducer
});

export const store = createStore(appReducer, applyMiddleware(...Middleware));
