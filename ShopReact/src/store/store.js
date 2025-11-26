import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import cartReducer from "./cartReducer";
import favoritesReducer from "./favoritesReducer";
import sneakersReducer from "./sneakersReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  sneakers: sneakersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
