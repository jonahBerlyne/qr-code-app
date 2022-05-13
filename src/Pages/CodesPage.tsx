import React, { useState, useEffect } from 'react';
import store from "../Redux/Store";
import { Link } from 'react-router-dom';
import { deleteQRCode } from '../Redux/Actions';
import { doc, deleteDoc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import QR from "../Components/QR";

export default function Codes() {

 const [contactCodesData, setContactCodesData] = useState<any[]>([]);
 const [dateCodesData, setDateCodesData] = useState<any[]>([]);
 const [emailCodesData, setEmailCodesData] = useState<any[]>([]);
 const [imgCodesData, setImgCodesData] = useState<any[]>([]);
 const [searchCodesData, setSearchCodesData] = useState<any[]>([]);
 const [urlCodesData, setUrlCodesData] = useState<any[]>([]);

 const getCodes = (code_collection: string, setCodesData: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
   const q = query(collection(fireDB, "users", `${auth.currentUser?.uid}`, code_collection), orderBy("timestamp", "desc"));
   const unsub = onSnapshot(q, snapshot => {
    let codesArr: any[] = [];
    let value: any = null;
    snapshot.docs.forEach(doc => {
      if (code_collection === "contact codes" || code_collection === "date codes") value = doc.data().card;
      if (code_collection === "email codes") value = doc.data().email;
      if (code_collection === "img codes") value = doc.data().img;
      if (code_collection === "search codes") value = doc.data().text;
      if (code_collection === "url codes") value = doc.data().url;
      const codeDoc = {
        ...doc.data(),
        codeCollection: code_collection,
        value
      };
      codesArr.push(codeDoc);
    });
    setCodesData(codesArr);
   });
   return unsub;
  } catch (err) {
    alert(`Codes retrieval error: ${err}`);
  }
 }

 useEffect(() => {
   getCodes("contact codes", setContactCodesData);
   getCodes("date codes", setDateCodesData);
   getCodes("email codes", setEmailCodesData);
   getCodes("img codes", setImgCodesData);
   getCodes("search codes", setSearchCodesData);
   getCodes("url codes", setUrlCodesData);
  return () => {
   setContactCodesData([]);
   setDateCodesData([]);
   setEmailCodesData([]);
   setImgCodesData([]);
   setSearchCodesData([]);
   setUrlCodesData([]);
  }
 }, []);

 return (
  <div className='codes-page'>
   <p className='codes-page-header'>Your QR Codes:</p>
   {contactCodesData.map(contact => {
    return (
     <div key={contact.id}>
      <QR  
        codeCollection={contact.codeCollection}
        codeType={contact.type}
        color={contact.color}
        id={contact.id}
        showDeleteBtn={true}
        timestamp={contact.timestamp}
        value={contact.value}
        first={contact.first}
        last={contact.last}
      />
     </div>
    );
   })}
   {dateCodesData.map(date => {
    return (
     <div key={date.id}>
      <QR  
        codeCollection={date.codeCollection}
        codeType={date.type}
        color={date.color}
        id={date.id}
        showDeleteBtn={true}
        timestamp={date.timestamp}
        value={date.value}
        event={date.event}
      />
     </div>
    );
   })}
   {emailCodesData.map(email => {
    return (
     <div key={email.id}>
      <QR  
        codeCollection={email.codeCollection}
        codeType={email.type}
        color={email.color}
        id={email.id}
        showDeleteBtn={true}
        timestamp={email.timestamp}
        value={email.value}
        to={email.to}
        subj={email.subj}
      />
     </div>
    );
   })}
   {imgCodesData.map(img => {
    return (
     <div key={img.id}>
      <QR  
        codeCollection={img.codeCollection}
        codeType={img.type}
        color={img.color}
        id={img.id}
        showDeleteBtn={true}
        timestamp={img.timestamp}
        value={img.value}
        name={img.name}
      />
     </div>
    );
   })}
   {searchCodesData.map(search => {
    return (
     <div key={search.id}>
      <QR  
        codeCollection={search.codeCollection}
        codeType={search.type}
        color={search.color}
        id={search.id}
        showDeleteBtn={true}
        timestamp={search.timestamp}
        value={search.value}
        text={search.text}
      />
     </div>
    );
   })}
   {urlCodesData.map(url => {
    return (
     <div key={url.id}>
      <QR  
        codeCollection={url.codeCollection}
        codeType={url.type}
        color={url.color}
        id={url.id}
        showDeleteBtn={true}
        timestamp={url.timestamp}
        value={url.value}
        url={url.url}
      />
     </div>
    );
   })}
   <Link to="/">Home</Link>
  </div>
 );
}

export interface CodeInterface {
 state: any;
 deleteItem: (code_collection: any, id: any) => Promise<any>;
};