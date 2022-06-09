import React, { useState, useEffect } from 'react';
import store from "../Redux/Store";
import { Link } from 'react-router-dom';
import { doc, deleteDoc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import QR from "../Components/QR";
import "../Styles/Codes.css";
import { ArrowBack } from "@mui/icons-material";
import { getAuth } from 'firebase/auth';

export default function Codes() {

 const [contactCodesData, setContactCodesData] = useState<any[]>([]);
 const [dateCodesData, setDateCodesData] = useState<any[]>([]);
 const [emailCodesData, setEmailCodesData] = useState<any[]>([]);
 const [imgCodesData, setImgCodesData] = useState<any[]>([]);
 const [searchCodesData, setSearchCodesData] = useState<any[]>([]);
 const [urlCodesData, setUrlCodesData] = useState<any[]>([]);

 const [finishedLoading, setFinishedLoading] = useState<boolean>(false);
 const [noCodes, setNoCodes] = useState<boolean>(false);

 const getCodes = (code_collection: string, setCodesData: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
   const q = query(collection(fireDB, "users", `${getAuth().currentUser?.uid}`, code_collection), orderBy("timestamp", "desc"));
   if (q === undefined) {
     if (code_collection === "url codes") setFinishedLoading(true);
     return;
   }
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
   if (code_collection === "url codes") setFinishedLoading(true);
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
   setFinishedLoading(false);
  }
 }, []);

 useEffect(() => {
   if (
     contactCodesData.length === 0 
     && dateCodesData.length === 0
     && emailCodesData.length === 0
     && imgCodesData.length === 0
     && searchCodesData.length === 0
     && urlCodesData.length === 0
     && finishedLoading
   ) setNoCodes(true);
   return () => {
     if (noCodes) setNoCodes(false);
   }
 }, [contactCodesData.length, dateCodesData.length, emailCodesData.length, imgCodesData.length, searchCodesData.length, urlCodesData.length, finishedLoading]);

 return (
  <div className='codes-page'>
   <p className="home-link">
    <Link to="/"><ArrowBack /></Link>
    Go back
   </p>
   {contactCodesData.length > 0 && finishedLoading && 
    <div className="contact-codes-container">
      <h2 className={`codes-header ${contactCodesData.length === 1 && "contact-code-one-header"}`}>Contact codes:</h2>
      <div className="codes-header-border"></div>
      <div className={`contact-codes ${contactCodesData.length === 1 && "contact-code-one"}`}>
        {contactCodesData.map(contact => {
          return (
          <div key={contact.id} className="contact-code">
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
      </div>
    </div>
   }
   {dateCodesData.length > 0 && finishedLoading &&
    <div className="date-codes-container">
      <h2 className={`codes-header ${dateCodesData.length === 1 && "date-code-one-header"}`}>Date codes:</h2>
      <div className="codes-header-border"></div>
      <div className={`date-codes ${dateCodesData.length === 1 && "date-code-one"}`}>
        {dateCodesData.map(date => {
          return (
          <div key={date.id} className="date-code">
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
      </div>
    </div>
   }
   {emailCodesData.length > 0 && finishedLoading &&
    <div className="email-codes-container">
      <h2 className={`codes-header ${emailCodesData.length === 1 && "email-code-one-header"}`}>Email codes:</h2>
      <div className="codes-header-border"></div>
      <div className={`email-codes ${emailCodesData.length === 1 && "email-code-one"}`}>
        {emailCodesData.map(email => {
          return (
          <div key={email.id} className="email-code">
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
      </div>
    </div>
   }
   {imgCodesData.length > 0 && finishedLoading &&
    <div className="img-codes-container">
      <h2 className={`codes-header ${imgCodesData.length === 1 && "img-code-one-header"}`}>Image codes:</h2>
      <div className="codes-header-border"></div>
      <div className={`img-codes ${imgCodesData.length === 1 && "img-code-one"}`}>
        {imgCodesData.map(img => {
          return (
          <div key={img.id} className="img-code">
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
      </div>
    </div>
   }
   {searchCodesData.length > 0 && finishedLoading && 
    <div className="search-codes-container">
      <h2 className={`codes-header ${searchCodesData.length === 1 && "search-code-one-header"}`}>Search codes:</h2>
      <div className="codes-header-border"></div>
      <div className={`search-codes ${searchCodesData.length === 1 && "search-code-one"}`}>
        {searchCodesData.map(search => {
          return (
          <div key={search.id} className="search-code">
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
      </div>
    </div>
   }
   {urlCodesData.length > 0 && finishedLoading &&
    <div className="url-codes-container">
      <h2 className={`codes-header ${urlCodesData.length === 1 && "url-code-one-header"}`}>URL codes:</h2>
      <div className="codes-header-border"></div>
      <div className={`url-codes ${urlCodesData.length === 1 && "url-code-one"}`}>
        {urlCodesData.map(url => {
          return (
          <div key={url.id} className="url-code">
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
      </div>
    </div>
   }
   {noCodes &&
    <h2 data-testid="noCodes" className='no-codes'>Sorry, but you don't have any QR codes saved.</h2>
   }
  </div>
 );
}

export interface CodeInterface {
 state: any;
 deleteItem: (code_collection: any, id: any) => Promise<any>;
};