import apiClient from "../api/client";

export const SET_IS_ADMIN = "SET_IS_ADMIN";

export const SET_SNEAKERS = "SET_SNEAKERS";
export const ADD_SNEAKER = "ADD_SNEAKER";
export const UPDATE_SNEAKER = "UPDATE_SNEAKER";
export const REMOVE_SNEAKER = "REMOVE_SNEAKER";

export const SET_CART = "SET_CART";
export const ADD_CART = "ADD_CART";
export const REMOVE_CART = "REMOVE_CART";
export const CLEAR_CART = "CLEAR_CART";

export const SET_FAVORITES = "SET_FAVORITES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

/* ---------------------- IsAdmin ---------------------- */

export const fetchIsAdmin = () => {
  return async (dispatch) => {
    try {
      const res = await apiClient.get("admin/is_admin/");
      dispatch({ type: SET_IS_ADMIN, payload: res.data.is_admin });
    } catch (error) {
      console.error("Ошибка при получении статуса администратора:", error);
    }
  };
};

/* ---------------------- Sneakers ---------------------- */



export const fetchSneakers = () => {
  return async (dispatch) => {
    const res = await apiClient.get("sneaker/");
    dispatch({ type: SET_SNEAKERS, payload: res.data });
  };
};


export const addSneaker = (sneakerData) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("name", sneakerData.name);
    formData.append("description", sneakerData.description);
    formData.append("price", sneakerData.price);
    formData.append("image", sneakerData.image);

    const res = await apiClient.post("admin/sneakers/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: ADD_SNEAKER, payload: res.data });
  }
 }

export const updateSneaker = (sneakerId, updatedData) => {
  return async (dispatch) => {
    updatedData.append("sneakerId", sneakerId);
    const res = await apiClient.put("admin/sneakers/", updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: UPDATE_SNEAKER, payload: res.data });
  }
}

export const deleteSneaker = (sneakerId) => {
  return async (dispatch) => {
    await apiClient.delete("admin/sneakers/", {
      data: { sneakerId }
    });
    dispatch({ type: REMOVE_SNEAKER, payload: sneakerId });
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

export const clearCart = () => {
  return async (dispatch) => {
    await apiClient.delete("cart/", { params: { deleteAll: true } });
    dispatch({ type: CLEAR_CART });
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
