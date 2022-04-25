import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../Firebase/Firebase';
import { onSnapshot, collection } from 'firebase/firestore';

export default function DateCodes({state, deleteItem}) {

 state = state.filter(item => item.type === "date");
 const [dates, setDates] = useState(state);
 
 
 useEffect(() => {
  onSnapshot(collection(db, "date codes"), (snapshot) => {
   setDates(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
  });
  
  return () => {
   setDates("");
  }
 }, []);

 return (
  <div>
   {dates.length !== 0 && <h3>QR Date Codes:</h3>}
   {dates.map(date => {
    return (
     <div key={date.id}>
      <h4>Code for {date.event.split("+").join(" ")}:</h4>
      <br/>
      <QRCode value={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${date.from}/${parseInt(date.to) + 1}&text=${date.event}&location=${date.location}&details=${date.details}`}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem(date.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}