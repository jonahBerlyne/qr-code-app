import * as actions from "./ActionTypes";

export const addContactCode = (id, first, last, card) => ({
 type: actions.ADD_CONTACT_CODE,
 payload: {
  id,
  first,
  last,
  card
 }
});

export const addDateCode = (id, from, to, event, location, details) => ({
 type: actions.ADD_DATE_CODE,
 payload: {
  id,
  from,
  to,
  event,
  location,
  details
 }
});

export const addEmailCode = (id, to, subj, msg, email) => ({
 type: actions.ADD_EMAIL_CODE,
 payload: {
  id,
  to,
  subj,
  msg,
  email
 }
});

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