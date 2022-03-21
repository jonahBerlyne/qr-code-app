import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../Firebase/Firebase';
import { onSnapshot, collection } from 'firebase/firestore';

export default function ContactCodes({state, deleteItem}) {

 state = state.filter(item => item.type === "contact");
 const [contacts, setContacts] = useState(state);
 
 
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
   {contacts.length !== 0 && <h3>QR Contact Codes:</h3>}
   {contacts.map(contact => {
    return (
     <div key={contact.id}>
      <h4>Contact Card for {contact.first} {contact.last}:</h4>
      <br/>
      <br/>
      <QRCode value={contact.card}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem(contact.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}