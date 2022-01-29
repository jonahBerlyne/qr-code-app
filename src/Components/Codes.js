import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import store from "../Redux/Store";
import { Link } from 'react-router-dom';
import { deleteQRCode } from '../Redux/Actions';

export default function Codes() {
 const [state, setState] = useState([]);

 useEffect(() => {
  setState(store.getState());
 });

 const [refresh, setRefresh] = useState(false);

 const deleteItem = id => {
  store.dispatch(deleteQRCode(id));
  setRefresh(!refresh);
 }

 return (
  <div>
   {state.map(item => {
    return (
     <div key={item.id}>
      <QRCode value={item.url}/>
      <br/>
      <a href={item.url} target="_blank">{item.url}</a>
      <br/>
      <br/>
      <button onClick={() => deleteItem(item.id)}>Delete QR Code</button>
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