import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import fireDB from '../firebaseConfig';
import "../Styles/Codes.css";
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { Clear } from "@mui/icons-material";

export default function Codes() {

 const [contactCodes, setContactCodes] = useState<any[]>([]);
 const [dateCodes, setDateCodes] = useState<any[]>([]);
 const [emailCodes, setEmailCodes] = useState<any[]>([]);
 const [imgCodes, setImgCodes] = useState<any[]>([]);
 const [searchCodes, setSearchCodes] = useState<any[]>([]);
 const [urlCodes, setUrlCodes] = useState<any[]>([]);

 const [codesRetrieved, setCodesRetrieved] = useState<boolean>(false);

 const deleteCode = async (id: string): Promise<any> => {
  try {
    const docRef = doc(fireDB, "users", `${getAuth().currentUser?.uid}`, "codes", id);
    await deleteDoc(docRef);
  } catch (err) {
    alert(`Code deletion error: ${err}`);
  }
 }

 useEffect(() => {
  const q = query(collection(fireDB, "users", `${getAuth().currentUser?.uid}`, "codes"), orderBy("timestamp", "desc"));
  const unsub = onSnapshot(q, snapshot => {
    let contactTemp: any[] = [];
    let dateTemp: any[] = [];
    let emailTemp: any[] = [];
    let imgTemp: any[] = [];
    let searchTemp: any[] = [];
    let urlTemp: any[] = [];
    snapshot.docs.forEach(doc => {
      if (doc.data()?.type === "contact") contactTemp.push(doc.data());
      if (doc.data()?.type === "date") dateTemp.push(doc.data());
      if (doc.data()?.type === "email") emailTemp.push(doc.data());
      if (doc.data()?.type === "img") imgTemp.push(doc.data());
      if (doc.data()?.type === "search") searchTemp.push(doc.data());
      if (doc.data()?.type === "url") urlTemp.push(doc.data());
    });
    setContactCodes(contactTemp);
    setDateCodes(dateTemp);
    setEmailCodes(emailTemp);
    setImgCodes(imgTemp);
    setSearchCodes(searchTemp);
    setUrlCodes(urlTemp);
  });
  setCodesRetrieved(true);
  return unsub;
 }, []);

 return (
  <div className='codes-page-container'>
    <Header />
    {(
      contactCodes.length === 0 &&
      dateCodes.length === 0 &&
      emailCodes.length === 0 &&
      imgCodes.length === 0 &&
      searchCodes.length === 0 &&
      urlCodes.length === 0 &&
      codesRetrieved
    ) && 
      <h2 data-testid="noCodes" className="no-codes-text">
        You haven't added any QR codes, yet.
      </h2>
    }
    {(
      (contactCodes.length > 0 ||
      dateCodes.length > 0 ||
      emailCodes.length > 0 ||
      imgCodes.length > 0 ||
      searchCodes.length > 0 ||
      urlCodes.length > 0) &&
      codesRetrieved
    ) && 
      <div className="all-codes-container">
        <h2 className="all-codes-header">Your QR Codes:</h2>
        <div className="codes-lists-container">
          {contactCodes.length > 0 && 
            <div className="codes-container">
              <h4 className="codes-header">Contact Codes:</h4>
              <ul>
                {contactCodes.map((contactCode, index) => {
                  return (               
                    <li key={index}>
                      <Link to={`/codes/${contactCode.id}`} className="code-link">{contactCode.info.first} {contactCode.info.last}</Link>
                      <div onClick={() => deleteCode(contactCode.id)}>
                        <Clear color="error" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          }
          {dateCodes.length > 0 && 
            <div className="codes-container">
              <h4 className="codes-header">Date Codes:</h4>
              <ul>
                {dateCodes.map((dateCode, index) => {
                  return (               
                    <li key={index}>
                      <Link to={`/codes/${dateCode.id}`} className="code-link">{dateCode.info.event}</Link>
                      <div onClick={() => deleteCode(dateCode.id)}>
                        <Clear color="error" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>          
          }
          {emailCodes.length > 0 && 
            <div className="codes-container">
              <h4 className="codes-header">Email Codes:</h4>
              <ul>
                {emailCodes.map((emailCode, index) => {
                  return (               
                    <li key={index}>
                      <Link to={`/codes/${emailCode.id}`} className="code-link">{emailCode.info.subj} --- {emailCode.info.to}</Link>
                      <div onClick={() => deleteCode(emailCode.id)}>
                        <Clear color="error" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>          
          }
          {imgCodes.length > 0 && 
            <div className="codes-container">
              <h4 className="codes-header">Image Codes:</h4>
              <ul>
                {imgCodes.map((imgCode, index) => {
                  return (               
                    <li key={index}>
                      <Link to={`/codes/${imgCode.id}`} className="code-link">{imgCode.info.name}</Link>
                      <div onClick={() => deleteCode(imgCode.id)}>
                        <Clear color="error" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>          
          }
          {searchCodes.length > 0 && 
            <div className="codes-container">
              <h4 className="codes-header">Search Codes:</h4>
              <ul>
                {searchCodes.map((searchCode, index) => {
                  return (               
                    <li key={index}>
                      <Link to={`/codes/${searchCode.id}`} className="code-link">{searchCode.value}</Link>
                      <div onClick={() => deleteCode(searchCode.id)}>
                        <Clear color="error" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>         
          }
          {urlCodes.length > 0 && 
            <div className="codes-container">
              <h4 className="codes-header">URL Codes:</h4>
              <ul>
                {urlCodes.map((urlCode, index) => {
                  return (               
                    <li key={index}>
                      <Link to={`/codes/${urlCode.id}`} className="code-link">{urlCode.value}</Link>
                      <div onClick={() => deleteCode(urlCode.id)}>
                        <Clear color="error" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>        
          }
        </div>
      </div>
    }
  </div>
 );
}