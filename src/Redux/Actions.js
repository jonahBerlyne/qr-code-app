import * as actions from "./ActionTypes";

export const addEmailCode = (id, email) => ({
 type: actions.ADD_EMAIL_CODE,
 payload: {
  id,
  email
 }
});

export const addImgCode = (id, src) => ({
 type: actions.ADD_IMG_CODE,
 payload: {
  id,
  src
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