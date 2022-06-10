import React, { useState, useEffect } from 'react';
import "../Styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import uniqid from "uniqid";
import store from '../Redux/Store';
import Sidebar from "../Components/Sidebar/Sidebar";
import ContactForm from "../Components/Forms/ContactForm";
import DateForm from "../Components/Forms/DateForm";
import EmailForm from "../Components/Forms/EmailForm";
import ImgForm from "../Components/Forms/ImgForm";
import TextForm from "../Components/Forms/TextForm";
import UrlForm from "../Components/Forms/UrlForm";
import fireDB, { storage, auth } from '../firebaseConfig';
import { doc, setDoc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { useDispatch } from 'react-redux';
import QR from "../Components/QR";

interface Values {
 id: string | undefined;
 firstName: string;
 lastName: string;
 phone: string;
 email: string;
 address: string;
 city: string;
 stateProvince: string;
 zipPostal: string;
 country: string;
 fromDate: string;
 toDate: string;
 theEvent: string;
 location: string;
 details: string;
 emailSubj: string;
 emailMsg: string;
 searchMsg: string;
 url: string;
};

export default function HomePage() {

 const initialValues = { 
   id: uniqid(), 
   firstName: '', 
   lastName: '', 
   phone: '', 
   email: '', 
   address: '', 
   city: '', 
   stateProvince: '', 
   zipPostal: '', 
   country: '', 
   fromDate: '', 
   toDate: '', 
   theEvent: '', 
   location: '', 
   details: '', 
   emailSubj: '', 
   emailMsg: '', 
   searchMsg: '', 
   url: '' 
 };

 const [values, setValues] = useState<Values>(initialValues);

 const handleChange = (e: any): void => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  });
 }

 const clearForm = (): void => setValues({...initialValues});

 const [noForm, setNoForm] = useState<boolean>(true);
 const [qrAttributes, setQRAttributes] = useState<any>({});
 const [qrCollection, setQRCollection] = useState<string>("");
 const [qrValue, setQRValue] = useState<string>("");
 const [qrIsShown, setQRIsShown] = useState<boolean>(false);

 const [contactIsShown, setContactIsShown] = useState<boolean>(false);
 const [dateIsShown, setDateIsShown] = useState<boolean>(false);
 const [emailIsShown, setEmailIsShown] = useState<boolean>(false);
 const [imgIsShown, setImgIsShown] = useState<boolean>(false);
 const [textIsShown, setTextIsShown] = useState<boolean>(false);
 const [urlIsShown, setUrlIsShown] = useState<boolean>(false);

 const [refresh, setRefresh] = useState<boolean>(false);

 const showContactForm = (): void => {
  if (noForm) setNoForm(false);
  if (qrIsShown) {
    setQRIsShown(false);
    setQRCollection("");
    setQRValue("");
    setQRAttributes({});
  }
  if (dateIsShown) setDateIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (textIsShown) setTextIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setContactIsShown(true);
  setRefresh(!refresh);
 }
 
 const showDateForm = (): void => {
  if (noForm) setNoForm(false);
  if (qrIsShown) {
    setQRIsShown(false);
    setQRCollection("");
    setQRValue("");
    setQRAttributes({});
  }
  if (contactIsShown) setContactIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (textIsShown) setTextIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setDateIsShown(true);
  setRefresh(!refresh);
 }

 const showEmailForm = (): void => {
  if (noForm) setNoForm(false);
  if (qrIsShown) {
    setQRIsShown(false);
    setQRCollection("");
    setQRValue("");
    setQRAttributes({});
  }
  if (contactIsShown) setContactIsShown(false);
  if (dateIsShown) setDateIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (textIsShown) setTextIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setEmailIsShown(true);
  setRefresh(!refresh);
 }

 const showImgForm = (): void => {
  if (noForm) setNoForm(false);
  if (qrIsShown) {
    setQRIsShown(false);
    setQRCollection("");
    setQRValue("");
    setQRAttributes({});
  }
  if (contactIsShown) setContactIsShown(false);
  if (dateIsShown) setDateIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (textIsShown) setTextIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setImgIsShown(true);
  setRefresh(!refresh);
 }


 const showTextForm = (): void => {
  if (noForm) setNoForm(false);
  if (qrIsShown) {
    setQRIsShown(false);
    setQRCollection("");
    setQRValue("");
    setQRAttributes({});
  }
  if (contactIsShown) setContactIsShown(false);
  if (dateIsShown) setDateIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setTextIsShown(true);
  setRefresh(!refresh);
 }

 const showUrlForm = (): void => {
  if (noForm) setNoForm(false);
  if (qrIsShown) {
    setQRIsShown(false);
    setQRCollection("");
    setQRValue("");
    setQRAttributes({});
  }
  if (contactIsShown) setContactIsShown(false);
  if (dateIsShown) setDateIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (textIsShown) setTextIsShown(false);
  setUrlIsShown(true);
  setRefresh(!refresh);
 }

 const [imgFile, setImgFile] = useState<any>(null);
 const [imgFileErr, setImgFileErr] = useState<string | null>(null);
 const types: string[] = ['image/png', 'image/jpeg'];
 const [imgPreview, setImgPreview] = useState<any>(null);

 const choosePic = (e: any): void => {
  const image = e.target.files[0];
  if (image && types.includes(image.type)) {
   setImgFile(image);
   setImgFileErr(null);
  } else {
   setImgFile(null);
   setImgFileErr("Please choose an image file (png or jpeg)");
  }
 }

 useEffect(() => {
   if (imgFile) setImgPreview(URL.createObjectURL(imgFile));
 }, [imgFile]);

 const handleImgUpload = async (): Promise<any> => {
  if (imgFile === null) return;
  try {
   const uploadTask = ref(storage, `${auth.currentUser?.uid}/${imgFile.name}`);
   await uploadBytes(uploadTask, imgFile);
   const imgUrl = await getDownloadURL(uploadTask);
   const timestamp = serverTimestamp();
   const payload = { 
    "color": "darkslategray",
    "id": values.id,
    "img": imgUrl, 
    "name": imgFile.name,
    "type": "img",
    timestamp
   };
   await handleDoc("img codes", values.id, payload);
   setImgPreview(null);
   setImgFile(null);
   setQRValue(imgUrl);
   setQRAttributes(payload);
   setQRCollection("img codes");
   setImgIsShown(false);
   setQRIsShown(true);
  } catch (err) {
   alert(`Image code upload error: ${err}`);
  }
 }

 const handleDoc = async (codes: string, id: any, codeDoc: any): Promise<any> => {
  const docRef = doc(fireDB, "users", `${auth.currentUser?.uid}`, codes, id);
  await setDoc(docRef, codeDoc);
 }

 const submitCode = async (): Promise<any> => {

  const timestamp = serverTimestamp();
  let payload: any = {};

  if (contactIsShown) {
   if (
     values.firstName === '' || 
     values.lastName === '' || 
     values.phone === '' || 
     values.email === '' || 
     values.address === '' || 
     values.city === '' || 
     values.stateProvince === '' || 
     values.zipPostal === '' || 
     values.country === ''
   ) {
    alert("Please fill in all inputs to generate a QR Code for your contact form.");
    return;
   }
   try {
     const contactCard = `MECARD:N:${values.lastName},${values.firstName};ADR:${values.address},${values.city},${values.stateProvince},${values.zipPostal},${values.country};TEL:${values.phone};EMAIL:${values.email};;`;
     payload = { 
       "color": "rosybrown",
       "id": values.id,
       "last": values.lastName, 
       "first": values.firstName, 
       "card": contactCard, 
       "type": "contact",
       timestamp
     };
     await handleDoc("contact codes", values.id, payload);
     setQRValue(contactCard);
     setQRAttributes(payload);
     setQRCollection("contact codes");
     setContactIsShown(false);
     setQRIsShown(true);
   } catch (err) {
     alert(`Contact code upload error: ${err}`);
   }
  }

  if (emailIsShown) {
   if (values.email === '' || values.emailSubj === '' || values.emailMsg === '') {
    alert("Please create an email to generate a QR Code.");
    return;
   }
   try {
     const fullEmail = `mailto:${values.email}?subject=${values.emailSubj}&body=${values.emailMsg}`;
     payload = {  
       "color": "goldenrod",
       "id": values.id,
       "email": fullEmail,
       "subj": values.emailSubj,
       "to": values.email, 
       "type": "email",
       timestamp 
     };
     await handleDoc("email codes", values.id, payload);
     setQRValue(fullEmail);
     setQRAttributes(payload);
     setQRCollection("email codes");
     setEmailIsShown(false);
     setQRIsShown(true);
   } catch (err) {
     alert(`Email code upload error: ${err}`);
   }
  }

  if (dateIsShown) {
   if (values.fromDate === '' || values.toDate === '' || values.theEvent === '' || values.location === '' || values.details === '') {
    alert("Please fill out the event form to generate a QR Code.");
    return;
   }
   try {
     const details = values.details.split(' ').join('+');
     const fromDate = values.fromDate.replace(/-/g, "");
     const location = values.location.split(' ').join('+');
     const toDate = values.toDate.replace(/-/g, "");
     const theEvent = values.theEvent.split(' ').join('+');

     const dateCard = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${fromDate}/${parseInt(toDate) + 1}&text=${theEvent}&location=${location}&details=${details}`;

     payload = { 
       "color": "red",
       "id": values.id,
       "card": dateCard, 
       "event": theEvent,
       "type": "date",
       timestamp 
     };

     await handleDoc("date codes", values.id, payload);
     setQRValue(dateCard);
     setQRAttributes(payload);
     setQRCollection("date codes");
     setDateIsShown(false);
     setQRIsShown(true);
   } catch (err) {
     alert(`Date code upload error: ${err}`);
   }
  }

  if (imgIsShown) {
    if (!imgFile) {
      alert("Please select an image.");
      return;
    }
    await handleImgUpload();
  }

  if (textIsShown) {
   if (values.searchMsg === '') {
    alert("Please enter a message to generate a QR Code.");
    return;
   }
   try {
     payload = {  
       "color": "black",
       "id": values.id,
       "text": values.searchMsg, 
       "type": "search",
       timestamp 
     };
     await handleDoc("search codes", values.id, payload);
     setQRValue(values.searchMsg);
     setQRAttributes(payload);
     setQRCollection("search codes");
     setTextIsShown(false);
     setQRIsShown(true);
   } catch (err) {
     alert(`Text code upload error: ${err}`);
   }
  }

  if (urlIsShown) {
   if (values.url === '') {
    alert("Please enter a url to generate a QR Code.");
    return;
   }
   try {
     const fullUrl = `https://${values.url}/`;
     payload = { 
       "color": "blue",
       "id": values.id,
       "url": fullUrl, 
       "type": "url",
       timestamp 
     };
     await handleDoc("url codes", values.id, payload);
     setQRValue(fullUrl);
     setQRAttributes(payload);
     setQRCollection("url codes");
     setUrlIsShown(false);
     setQRIsShown(true);
   } catch (err) {
     alert(`Url code upload error: ${err}`);
   }
  }

  clearForm();
  setRefresh(!refresh);
 }

 const sidebarProps = { showContactForm, showDateForm, showEmailForm, showImgForm, showTextForm, showUrlForm };
 const formProps = { values, handleChange };
 const imgProps = { choosePic, imgFile, imgFileErr, imgPreview };

 const logOut = async (): Promise<any> => {
   try {
     await signOut(auth);
   } catch (err) {
     alert(`Signout error: ${err}`);
   }
 }

 const navigate = useNavigate();

 const goToCodesPage = (): void => navigate("/codes");
  
 return (
   <div className="home">
     {noForm && <h2 className='no-form'>Click an option from the sidebar and create your own QR code!</h2>}
     <Sidebar {...sidebarProps}/>

      {qrIsShown && 
        <div className={
          `${qrAttributes.type === "contact" && "contact-code-container"} ${qrAttributes.type === "date" && "date-code-container"}
          ${qrAttributes.type === "email" && "email-code-container"}
          ${qrAttributes.type === "img" && "img-code-container"}
          ${qrAttributes.type === "search" && "search-code-container"}
          ${qrAttributes.type === "url" && "url-code-container"}`
        }>
          <QR  
            codeCollection={qrCollection}
            codeType={qrAttributes.type} 
            color={qrAttributes.color}
            id={qrAttributes.id}
            showDeleteBtn={false}
            timestamp={qrAttributes.timestamp}
            value={qrValue}
            event={qrAttributes?.event}
            first={qrAttributes?.first}
            last={qrAttributes?.last}
            name={qrAttributes?.name}
            subj={qrAttributes?.subj}
            text={qrAttributes?.text}
            to={qrAttributes?.to}
            url={qrAttributes?.url}
          />
        </div>
      }

     {contactIsShown && <ContactForm {...formProps} />} 
     {dateIsShown && <DateForm {...formProps}/>}
     {emailIsShown && <EmailForm {...formProps}/>}
     {imgIsShown && <ImgForm {...imgProps}/>}
     {textIsShown && <TextForm {...formProps}/>}
     {urlIsShown && <UrlForm {...formProps}/>}
     <br/>
     <br/>
     {!noForm && !qrIsShown && <button type="submit" onClick={submitCode} className="btn btn-success qr-code-btn">Generate QR Code</button>}
     <br/>
     <br/>
     <br/>
     <br/>
     <div className="footer">
      <button className='btn btn-info codes-link-btn' onClick={goToCodesPage}>Your QR Codes</button>
      <p>QR Code App</p>
      <button onClick={logOut} className="btn btn-warning sign-out-btn">Sign Out</button>
     </div>
   </div>
 );
}

export interface FormInterface {
 values: Values;
 handleChange: (e: any) => void;
};