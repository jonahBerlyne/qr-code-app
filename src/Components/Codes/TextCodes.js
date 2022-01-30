import React from 'react';
import QRCode from 'qrcode.react';

export default function TextCodes({state, deleteItem}) {

 return (
  <div>
   <h3>Text QR Codes:</h3>
   {state.filter(item => item.type === "text").map(item => {
    return (
     <div key={item.id}>
      <h4>{item.text}</h4>
      <br/>
      <QRCode value={item.text}/>
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