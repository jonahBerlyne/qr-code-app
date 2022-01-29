import * as actions from "./ActionTypes";

export default function reducer(state = [], action) {
 switch (action.type) {
  case actions.ADD_QR_CODE:

   const isInCodes = state.find(item => item.url === action.payload.url);
   return isInCodes ? state : [...state, {...action.payload}];

  case actions.DELETE_QR_CODE:

   return state.filter(item => item.id !== action.payload.id);
   
  default:
   return state;
 }
}