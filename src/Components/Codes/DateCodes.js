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
      <QRCode value={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${item.from}/${parseInt(item.to) + 1}&text=${item.event}&location=${item.location}&details=${item.details}`}/>
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