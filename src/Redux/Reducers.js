import * as actions from "./ActionTypes";

export default function reducer(state = [], action) {
 switch (action.type) {
  case actions.QR_CODE_ADDED:

   const isInCodes = state.find(item => item.url === action.payload.url);
   return isInCodes ? state : [...state, {...action.payload}];

  case actions.QR_CODE_DELETED:

   return state.filter(item => item.id !== action.payload.id);
   
  default:
   return state;
 }
}