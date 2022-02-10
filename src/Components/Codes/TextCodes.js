import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../Firebase/Firebase';
import { useAuth } from '../../Firebase/Firebase';
import { onSnapshot, collection } from 'firebase/firestore';

export default function TextCodes({state, deleteItem}) {

 const currentUser = useAuth();
 console.log(currentUser);
 state = state.filter(item => item.type === "text");
 const [texts, setTexts] = useState(state);
 
 
 useEffect(() => {
  onSnapshot(collection(db, "text codes"), (snapshot) => {
   setTexts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
  });
  
  return () => {
   setTexts("");
  }
 }, []);

 return (
  <div>
   <h1>{currentUser?.email}</h1>
   {texts.length !== 0 && <h3>QR Text Codes:</h3>}
   {texts.map(text => {
    return (
     <div key={text.id}>
      <h4>{text.text}</h4>
      <br/>
      <QRCode value={text.text}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem(text.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}