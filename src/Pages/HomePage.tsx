import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addContactCode, addDateCode, addEmailCode, addImgCode, addTextCode, addUrlCode } from '../Redux/Actions';
import Sidebar from "../Components/Sidebar/Sidebar";
import ContactForm from "../Components/Forms/ContactForm";
import DateForm from "../Components/Forms/DateForm";
import EmailForm from "../Components/Forms/EmailForm";
import ImgForm from "../Components/Forms/ImgForm";
import TextForm from "../Components/Forms/TextForm";
import UrlForm from "../Components/Forms/UrlForm";
import fireDB, { storage } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { useDispatch } from 'react-redux';

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

 const [contactIsShown, setContactIsShown] = useState<boolean>(false);
 const [dateIsShown, setDateIsShown] = useState<boolean>(false);
 const [emailIsShown, setEmailIsShown] = useState<boolean>(false);
 const [imgIsShown, setImgIsShown] = useState<boolean>(false);
 const [textIsShown, setTextIsShown] = useState<boolean>(false);
 const [urlIsShown, setUrlIsShown] = useState<boolean>(false);

 const [refresh, setRefresh] = useState<boolean>(false);

 const showContactForm = (): void => {
  setDateIsShown(false);
  setEmailIsShown(false);
  setImgIsShown(false);
  setTextIsShown(false);
  setUrlIsShown(false);
  setContactIsShown(true);
  setRefresh(!refresh);
 }
 
 const showDateForm = (): void => {
  setContactIsShown(false);
  setEmailIsShown(false);
  setImgIsShown(false);
  setTextIsShown(false);
  setUrlIsShown(false);
  setDateIsShown(true);
  setRefresh(!refresh);
 }

 const showEmailForm = (): void => {
  setContactIsShown(false);
  setDateIsShown(false);
  setImgIsShown(false);
  setTextIsShown(false);
  setUrlIsShown(false);
  setEmailIsShown(true);
  setRefresh(!refresh);
 }

 const showImgForm = (): void => {
  setContactIsShown(false);
  setDateIsShown(false);
  setEmailIsShown(false);
  setTextIsShown(false);
  setUrlIsShown(false);
  setImgIsShown(true);
  setRefresh(!refresh);
 }


 const showTextForm = (): void => {
  setContactIsShown(false);
  setDateIsShown(false);
  setEmailIsShown(false);
  setImgIsShown(false);
  setUrlIsShown(false);
  setTextIsShown(true);
  setRefresh(!refresh);
 }

 const showUrlForm = (): void => {
  setContactIsShown(false);
  setDateIsShown(false);
  setEmailIsShown(false);
  setImgIsShown(false);
  setTextIsShown(false);
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

 const auth = getAuth();

 const handleImgUpload = async (): Promise<any> => {
  if (imgFile === null) return;
  try {
   const uploadTask = ref(storage, `${auth.currentUser?.uid}/${imgFile.name}`);
   await uploadBytes(uploadTask, imgFile);
   const imgUrl = await getDownloadURL(uploadTask);
   const payload = { 
    "id": values.id, 
    "img": imgUrl, 
    "name": imgFile.name,
    "type": "img"
   };
   await handleDoc("img codes", values.id, payload);
   dispatch(addImgCode(values.id, imgUrl));
   setImgPreview(null);
   setImgFile(null);
   setImgIsShown(false);
   setTimeout(() => {
     setImgIsShown(true);
   }, 0.000000000000001);
  } catch (err) {
   alert(`Image code upload error: ${err}`);
  }
 }

 const dispatch = useDispatch();

 const handleDoc = async (collection: string, id: string | undefined, payload: any): Promise<any> => {
  if (id !== undefined) {
    const docRef = doc(fireDB, collection, id);
    await setDoc(docRef, payload);
  }
 }

 const submitCode = async (): Promise<any> => {

  let payload;

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
     values.country === '' || 
     values.url === ''
   ) {
    alert("Please fill in all inputs to generate a QR Code for your contact form.");
    return;
   }
   try {
     const contactCard = `MECARD:N:${values.lastName},${values.firstName};ADR:${values.address},${values.city},${values.stateProvince},${values.zipPostal},${values.country};TEL:${values.phone};EMAIL:${values.email};URL:http://${values.url};;`;
     payload = { 
       "id": values.id, 
       "last": values.lastName, 
       "first": values.firstName, 
       "card": contactCard, 
       "type": "contact" 
     };
     await handleDoc("contact codes", values.id, payload);
     dispatch(addContactCode(values.id, values.firstName, values.lastName, contactCard));
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
       "id": values.id, 
       "email": fullEmail, 
       "subj": values.emailSubj, 
       "to": values.email, 
       "msg": values.emailMsg, 
       "type": "email" 
     };
     await handleDoc("email codes", values.id, payload);
     dispatch(addEmailCode(values.id, values.email, values.emailSubj, values.emailMsg, fullEmail));
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
     payload = { 
       "id": values.id, 
       "from": values.fromDate, 
       "to": values.toDate, 
       "event": values.theEvent, 
       "location": values.location, 
       "details": values.details, 
       "type": "date" 
     };
     await handleDoc("date codes", values.id, payload);
     dispatch(addDateCode(values.id, `${values.fromDate.replace(/-/g, "")}`, `${values.toDate.replace(/-/g, "")}`, values.theEvent.split(' ').join('+'), values.location.split(' ').join('+'), values.details.split(' ').join('+')));
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
       "id": values.id, 
       "text": values.searchMsg, 
       "type": "text" 
     };
     await handleDoc("text codes", values.id, payload);
     dispatch(addTextCode(values.id, values.searchMsg));
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
       "id": values.id, 
       "url": fullUrl, 
       "type": "url" 
     };
     await handleDoc("url codes", values.id, payload);
     dispatch(addUrlCode(values.id, fullUrl));
   } catch (err) {
     alert(`Url code upload error: ${err}`);
   }
  }

  if (!imgIsShown) clearForm();
  setRefresh(!refresh);
  console.log(store.getState());
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
  
 return (
   <div className="home">
     <h1 className="home-header">QR Code App</h1>
     <Sidebar {...sidebarProps}/>
     {contactIsShown && <ContactForm {...formProps}/>} 
     {dateIsShown && <DateForm {...formProps}/>}
     {emailIsShown && <EmailForm {...formProps}/>}
     {imgIsShown && <ImgForm {...imgProps}/>}
     {textIsShown && <TextForm {...formProps}/>}
     {urlIsShown && <UrlForm {...formProps}/>}
     <br/>
     <br/>
     <button type="submit" onClick={submitCode}>Generate QR Code</button>
     <br/>
     <br/>
     <br/>
     <br/>
     <Link to="/codes">Your QR Codes</Link>
     <button onClick={logOut}>Sign Out</button>
   </div>
 );
}

export interface FormInterface {
 values: Values;
 handleChange: (e: any) => void;
};