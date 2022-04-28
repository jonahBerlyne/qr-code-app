import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../Firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import store from '../../Redux/Store';
import { CodeInterface } from "./Codes";

export default function TextCodes({state, deleteItem}: CodeInterface) {

 const [texts, setTexts] = useState<any>(null);

 useEffect(() => {
  const filteredState = state.filter((item: any) => item.type === "text");
  setTexts(filteredState);
 }, []);
 
 
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
   {texts.length !== 0 && <h3>QR Text Codes:</h3>}
   {texts.map((text: any) => {
    return (
     <div key={text.id}>
      <h4>{text.text}</h4>
      <br/>
      <QRCode value={text.text}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem("text codes", text.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}