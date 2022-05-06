import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../firebaseConfig';
import { onSnapshot, collection } from 'firebase/firestore';
import { CodeInterface } from "../../Pages/CodesPage";

export default function EmailCodes({state, deleteItem}: CodeInterface) {

 const [emails, setEmails] = useState<any>(null);

 useEffect(() => {
  const filteredState = state.filter((item: any) => item.type === "email");
  setEmails(filteredState);
 }, []);
 
 
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
   {emails && emails.length !== 0 && <h3>QR Email Codes:</h3>}
   {emails && emails.map((email: any) => {
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