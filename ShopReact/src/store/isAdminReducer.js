import { SET_IS_ADMIN } from "./actions";

const initialState = {
  isAdmin: false,  
};

export default function isAdminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_ADMIN:
      return { ...state, isAdmin: action.payload,};

    default:
      return state;
  }
}
