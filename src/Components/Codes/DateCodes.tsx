import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../Firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import { CodeInterface } from "./Codes";

export default function DateCodes({state, deleteItem}: CodeInterface) {

 const [dates, setDates] = useState<any>(null);

 useEffect(() => {
  const filteredState = state.filter((item: any) => item.type === "date");
  setDates(filteredState);
 }, []);
 
 
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
   {dates && dates.length !== 0 && <h3>QR Date Codes:</h3>}
   {dates && dates.map((date: any) => {
    console.log(`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${date.from}/${parseInt(date.to) + 1}&text=${date.event}&location=${date.location}&details=${date.details}`);
    return (
     <div key={date.id}>
      <h4>Code for {date.event.split("+").join(" ")}:</h4>
      <br/>
      <QRCode value={`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${date.from}/${parseInt(date.to) + 1}&text=${date.event}&location=${date.location}&details=${date.details}`}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem("date codes", date.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}