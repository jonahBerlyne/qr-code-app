import * as actions from "./ActionTypes";

export const addContactCode = (id: string | undefined, first: string, last: string, card: string) => ({
 type: actions.ADD_CONTACT_CODE,
 payload: {
  id,
  first,
  last,
  card
 }
});

export const addDateCode = (id: string | undefined, from: string, to: string, event: string, location: string, details: string) => ({
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

export const addEmailCode = (id: string | undefined, to: string, subj: string, msg: string, email: string) => ({
 type: actions.ADD_EMAIL_CODE,
 payload: {
  id,
  to,
  subj,
  msg,
  email
 }
});

export const addImgCode = (id: string | undefined, img: string) => ({
 type: actions.ADD_IMG_CODE,
 payload: {
  id,
  img
 }
});

export const addTextCode = (id: string | undefined, text: string) => ({
 type: actions.ADD_TEXT_CODE,
 payload: {
  id,
  text
 }
});

export const addUrlCode = (id: string | undefined, url: string) => ({
 type: actions.ADD_URL_CODE,
 payload: {
  id,
  url
 }
});

export const deleteQRCode = (id: string | undefined) => ({
 type: actions.DELETE_QR_CODE,
 payload: {
  id
 }
});