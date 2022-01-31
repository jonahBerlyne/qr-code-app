import * as actions from "./ActionTypes";


export default function reducer(state = [], action) {

  const isInCodes = state.find(item => item.id === action.payload.id);

  switch (action.type) {

   case actions.ADD_EMAIL_CODE:
    return isInCodes ? state : [...state, {...action.payload, type: "email"}];

   case actions.ADD_IMG_CODE:
    return isInCodes ? state : [...state, {...action.payload, type: "img"}];

   case actions.ADD_TEXT_CODE:
    return isInCodes ? state : [...state, {...action.payload, type: "text"}];

   case actions.ADD_URL_CODE:
    return isInCodes ? state : [...state, {...action.payload, type: "url"}];

   case actions.DELETE_QR_CODE:
    return state.filter(item => item.id !== action.payload.id);
   
   default:
    return state;
 }
}