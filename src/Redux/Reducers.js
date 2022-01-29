import * as actions from "./ActionTypes";

export default function reducer(state = [], action) {
 switch (action.type) {
  case actions.QR_CODE_ADDED:

   return state.map(item => item.id === action.payload.id ? item : [...state, {...action.payload}]);

  default:
   return state;
 }
}