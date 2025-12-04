import { SET_CART, ADD_CART, REMOVE_CART, CLEAR_CART } from "./actions";

const initialState = {
  items: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, items: action.payload };

    case ADD_CART:
      return { ...state, items: [...state.items, action.payload] };

    case REMOVE_CART:
      return { ...state, items: state.items.filter((i) => i.sneaker.id !== action.payload),};
    
    case CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
}
