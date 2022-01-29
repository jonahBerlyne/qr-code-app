import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import store from "../Redux/Store";
import { Link } from 'react-router-dom';


export default function Codes() {
 const [state, setState] = useState([]);

 useEffect(() => {
  setState(store.getState());
 }, []);
 
 return (
  <div>
   {state.map(item => {
    return (
     <div key={item.id}>
      <QRCode value={item.url}/>
      <h3>{item.url}</h3>
      {console.log(state)}
     </div>
    );
   })}
   <Link to="/">Home</Link>
  </div>
 );
}