import React from 'react';
import qrcode from 'qrcode.react';

export default function ContactCodes({state, deleteItem}) {

 state = state.filter(item => item.type === "contact");

 return (
  <div>
   {state.length !== 0 && <h3>QR Contact Codes:</h3>}
   {state.map(item => {
    return (
     <div key={item.id}>
      <h4>{item.first} {item.last}:</h4>
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