import * as actions from "./ActionTypes";

export const addContactCode = (id, first, last, phone, email, street, city, state, zip, country, url) => ({
 type: actions.ADD_CONTACT_CODE,
 payload: {
  id,
  first,
  last,
  phone,
  email,
  street,
  city,
  state,
  zip,
  country,
  url 
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

export const addEmailCode = (id, address, subj, msg, email) => ({
 type: actions.ADD_EMAIL_CODE,
 payload: {
  id,
  address,
  subj,
  msg,
  email
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