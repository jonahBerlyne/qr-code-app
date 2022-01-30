import * as actions from "./ActionTypes";

let isInCodes;

export default function reducer(state = [], action) {
 switch (action.type) {

  case actions.ADD_TEXT_CODE:
    
   isInCodes = state.find(item => item.id === action.payload.id);
   return isInCodes ? state : [...state, {...action.payload, type: "text"}];

  case actions.ADD_URL_CODE:

   isInCodes = state.find(item => item.url === action.payload.url);
   return isInCodes ? state : [...state, {...action.payload, type: "url"}];

  case actions.DELETE_QR_CODE:

   return state.filter(item => item.id !== action.payload.id);
   
  default:
   return state;
 }
}