import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../Firebase/Firebase';
import { onSnapshot, collection } from 'firebase/firestore';

export default function EmailCodes({state, deleteItem}) {

 state = state.filter(item => item.type === "email");
 const [emails, setEmails] = useState(state);
 
 
 useEffect(() => {
  onSnapshot(collection(db, "email codes"), (snapshot) => {
   setEmails(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
  });
  
  return () => {
   setEmails("");
  }
 }, []);

 return (
  <div>
   {emails.length !== 0 && <h3>QR Email Codes:</h3>}
   {emails.map(email => {
    return (
     <div key={email.id}>
      <h3>Email to:</h3>
      <h4>{email.to}</h4>
      <h3>Subject:</h3>
      <h4>{email.subj}</h4>
      <h3>Message:</h3>
      <h4>{email.msg}</h4>
      <QRCode value={email.email}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem("email codes", email.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}