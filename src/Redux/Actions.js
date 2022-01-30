import * as actions from "./ActionTypes";

export const addTextCode = (id, text) => ({
 type: actions.ADD_TEXT_CODE,
 payload: {
  id,
  text
 }
});

export const addUrlCode = (id, url) => ({
 type: actions.ADD_URL_CODE,
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