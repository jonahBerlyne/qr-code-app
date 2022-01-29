import * as actions from "./ActionTypes";

export const addQRCode = (id, url) => ({
 type: actions.ADD_QR_CODE,
 payload: {
  id,
  url
 }
});

export const deleteQRCode = id => ({
 type: actions.DELETE_QR_CODE,
 payload: {
  id
 }
});