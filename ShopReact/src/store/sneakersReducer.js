import { SET_SNEAKERS, ADD_SNEAKER, UPDATE_SNEAKER, REMOVE_SNEAKER } from "./actions";

const initialState = {
  items: [],
};

export default function sneakersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SNEAKERS:
      return { ...state, items: action.payload };

    case ADD_SNEAKER:
      return { ...state, items: [...state.items, action.payload] };

    case UPDATE_SNEAKER:
      return {...state, items: state.items.map(sneaker => 
        sneaker.id === action.payload.id ? action.payload : sneaker
      )};

    case REMOVE_SNEAKER:
      return {...state, items: state.items.filter(sneaker => sneaker.id !== action.payload)};

    default:
      return state;
  }
}
