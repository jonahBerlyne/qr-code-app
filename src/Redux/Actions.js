import * as actions from "./ActionTypes";

export const qrCodeAdded = (id, url, code) => ({
 type: actions.QR_CODE_ADDED,
 payload: {
  id,
  url,
  code
 }
});