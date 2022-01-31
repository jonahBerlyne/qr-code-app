import React from 'react';
import QRCode from 'qrcode.react';

export default function DateCodes({state, deleteItem}) {

 state = state.filter(item => item.type === "date");

 return (
  <div>
   {state.length !== 0 && <h3>QR Date Codes:</h3>}
   {state.map(item => {
    return (
     <div key={item.id}>
      <h4>Code for {item.event.split("+").join(" ")}:</h4>
      <br/>
      <QRCode value={`http://calendar.google.com/calendar/r/eventedit?text=${item.event}&dates=${item.from}/${item.to}/`}/>
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