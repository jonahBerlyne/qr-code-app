import React from 'react';
import QRCode from 'qrcode.react';

export default function EmailCodes({state, deleteItem}) {

 state = state.filter(item => item.type === "email");

 return (
  <div>
   {state.length !== 0 && <h3>QR Email Codes:</h3>}
   {state.map(item => {
    return (
     <div key={item.id}>
      <h3>Email to:</h3>
      <h4>{item.to}</h4>
      <h3>Subject:</h3>
      <h4>{item.subj}</h4>
      <h3>Message:</h3>
      <h4>{item.msg}</h4>
      <QRCode value={item.email}/>
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