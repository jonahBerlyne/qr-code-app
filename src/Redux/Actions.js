import * as actions from "./ActionTypes";

export const qrCodeAdded = (id, url) => ({
 type: actions.QR_CODE_ADDED,
 payload: {
  id,
  url
 }
});

export const qrCodeDeleted = id => ({
 type: actions.QR_CODE_DELETED,
 payload: {
  id
 }
});