import { SET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from "./actions";

const initialState = {
  items: [],
};

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, items: action.payload };

    case ADD_FAVORITE:
      return { ...state, items: [...state.items, action.payload] };

    case REMOVE_FAVORITE:
      return { ...state, items: state.items.filter((i) => i.sneaker.id !== action.payload)};

    default:
      return state;
  }
}
