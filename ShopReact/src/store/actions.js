import apiClient from "../api/client";

export const SET_SNEAKERS = "SET_SNEAKERS";

export const SET_CART = "SET_CART";
export const ADD_CART = "ADD_CART";
export const REMOVE_CART = "REMOVE_CART";

export const SET_FAVORITES = "SET_FAVORITES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

/* ---------------------- Sneakers ---------------------- */



export const fetchSneakers = () => {
  return async (dispatch) => {
    const res = await apiClient.get("sneaker/");
    dispatch({ type: SET_SNEAKERS, payload: res.data });
  };
};

/* ---------------------- Cart ---------------------- */


export const fetchCart = () => {
  return async (dispatch) => {
    const res = await apiClient.get("cart/");
    dispatch({ type: SET_CART, payload: res.data });
  };
};

export const addToCart = (sneakerId) => {
  return async (dispatch) => {
    const res = await apiClient.post("cart/", { sneakerId });
    dispatch({ type: ADD_CART, payload: res.data });
  };
};

export const removeFromCart = (sneakerId) => {
  return async (dispatch) => {
    await apiClient.delete("cart/", { data: { sneakerId } });
    dispatch({ type: REMOVE_CART, payload: sneakerId });
  };
};

/* ---------------------- Favorites ---------------------- */



export const fetchFavorites = () => {
  return async (dispatch) => {
    const res = await apiClient.get("favorites/");
    dispatch({ type: SET_FAVORITES, payload: res.data });
  };
};

export const addToFavorite = (sneakerId) => {
  return async (dispatch) => {
    const res = await apiClient.post("favorites/", { sneakerId });
    dispatch({ type: ADD_FAVORITE, payload: res.data });
  };
};

export const removeFromFavorite = (sneakerId) => {
  return async (dispatch) => {
    await apiClient.delete("favorites/", { data: { sneakerId } });
    dispatch({ type: REMOVE_FAVORITE, payload: sneakerId });
  };
};
