import React from 'react';
import QRCode from 'qrcode.react';

export default function UrlCodes({state, deleteItem}) {

 return (
  <div>
   {state.filter(item => item.type === "url").map(item => {
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
  </div>
 );
}