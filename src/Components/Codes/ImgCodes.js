import React from 'react';
import QRCode from 'qrcode.react';

export default function ImgCodes({state, deleteItem}) {

 state = state.filter(item => item.type === "img");

 return (
  <div>
   {state.length !== 0 && <h3>QR Image Codes:</h3>}
   {state.map(item => {
    return (
     <div key={item.id}>
      <img src={item.src} alt={item.src} height="200px" width="400px"/>
      <br/>
      <QRCode value={item.src}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem(item.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}