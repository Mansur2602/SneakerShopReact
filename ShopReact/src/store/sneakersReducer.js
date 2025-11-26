import { SET_SNEAKERS } from "./actions";

const initialState = {
  items: [],
};

export default function sneakersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SNEAKERS:
      return { ...state, items: action.payload };

    default:
      return state;
  }
}
