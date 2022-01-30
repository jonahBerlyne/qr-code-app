import * as actions from "./ActionTypes";

export const addImgCode = (id, img) => ({
 type: actions.ADD_IMG_CODE,
 payload: {
  id,
  img
 }
});

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