import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../firebaseConfig';
import { onSnapshot, collection } from 'firebase/firestore';
import { CodeInterface } from "../../Pages/CodesPage";

export default function ContactCodes({state, deleteItem}: CodeInterface) {

 const [contacts, setContacts] = useState<any>(null);

 useEffect(() => {
  const filteredState = state.filter((item: any) => item.type === "contact");
  setContacts(filteredState);
 }, []);
 
 
 useEffect(() => {
  onSnapshot(collection(db, "contact codes"), (snapshot) => {
   setContacts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
  });
  
  return () => {
   setContacts("");
  }
 }, []);

 return (
  <div>
   {contacts && contacts.length !== 0 && <h3>QR Contact Codes:</h3>}
   {contacts && contacts.map((contact: any) => {
    return (
     <div key={contact.id}>
      <h4>Contact Card for {contact.first} {contact.last}:</h4>
      <br/>
      <br/>
      <QRCode value={contact.card}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem("contact codes", contact.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}