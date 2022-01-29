import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import store from "../Redux/Store";
import { Link } from 'react-router-dom';
import { qrCodeDeleted } from '../Redux/Actions';

export default function Codes() {
 const [state, setState] = useState([]);

 useEffect(() => {
  setState(store.getState());
 });

 const [refresh, setRefresh] = useState(false);

 const deleteQRCode = id => {
  store.dispatch(qrCodeDeleted(id));
  setRefresh(!refresh);
 }

 return (
  <div>
   {state.map(item => {
    return (
     <div key={item.id}>
      <QRCode value={item.url}/>
      <h3>{item.url}</h3>
      <button onClick={() => deleteQRCode(item.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
   <br/>
   <Link to="/">Home</Link>
  </div>
 );
}