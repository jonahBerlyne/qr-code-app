import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../Firebase/Firebase';
import { onSnapshot, collection } from 'firebase/firestore';

export default function UrlCodes({state, deleteItem}) {

 state = state.filter(item => item.type === "url");
 const [urls, setUrls] = useState(state);
 
 
 useEffect(() => {
  onSnapshot(collection(db, "url codes"), (snapshot) => {
   setUrls(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
  });
  
  return () => {
   setUrls("");
  }
 }, []);

 return (
  <div>
   {urls.length !== 0 && <h3>QR Website Codes:</h3>}
   {urls.map(url => {
    return (
     <div key={url.id}>
      <a href={url.url} target="_blank">{url.url}</a>
      <br/>
      <br/>
      <QRCode value={url.url}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem("url codes", url.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}