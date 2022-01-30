import React from 'react';
import QRCode from 'qrcode.react';

export default function UrlCodes({state, deleteItem}) {

 return (
  <div>
   <h3>Website QR Codes:</h3>
   {state.filter(item => item.type === "url").map(item => {
    return (
     <div key={item.id}>
      <a href={item.url} target="_blank">{item.url}</a>
      <br/>
      <br/>
      <QRCode value={item.url}/>
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