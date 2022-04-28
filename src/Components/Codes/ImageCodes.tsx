import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import db from '../../Firebase/Firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import { CodeInterface } from "./Codes";

export default function ImageCodes({ state, deleteItem }: CodeInterface) {

 const [imgs, setImgs] = useState<any>(null);

 useEffect(() => {
  const filteredState = state.filter((item: any) => item.type === "img");
  setImgs(filteredState);
 }, []);
 
 
 useEffect(() => {
  onSnapshot(collection(db, "image codes"), (snapshot) => {
   setImgs(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
  });
  
  return () => {
   setImgs("");
  }
 }, []);

 return (
  <div>
   {imgs.length !== 0 && <h3>QR Image Codes:</h3>}
   {imgs.map((img: any) => {
    return (
     <div key={img.id}>
      <h3>Image of:</h3>
      <h4>{img.img}</h4>
      <QRCode value={img.img}/>
      <br/>
      <br/>
      <button onClick={() => deleteItem("image codes", img.id)}>Delete QR Code</button>
      <br/>
      <br/>
     </div>
    );
   })}
  </div>
 );
}