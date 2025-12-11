import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import cartReducer from "./cartReducer";
import favoritesReducer from "./favoritesReducer";
import sneakersReducer from "./sneakersReducer";
import isAdminReducer from "./isAdminReducer"; 

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  sneakers: sneakersReducer,
  isAdmin: isAdminReducer,

});

export const store = createStore(rootReducer, applyMiddleware(thunk));
