import React, { useState, useEffect } from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addContactCode, addDateCode, addEmailCode, addImgCode, addTextCode, addUrlCode } from '../Redux/Actions';
import SideBar from './Sidebar/SideBar';
import ContactForm from './Forms/ContactForm';
import DateForm from './Forms/DateForm';
import EmailForm from './Forms/EmailForm';
import ImgForm from "./Forms/ImgForm";
import TextForm from './Forms/TextForm';
import UrlForm from './Forms/UrlForm';
import fireDB, { storage } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
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
 img: string;
 searchMsg: string;
 url: string;
};

export default function QR() {

 const initialValues = { id: uniqid(), firstName: '', lastName: '', phone: '', email: '', address: '', city: '', stateProvince: '', zipPostal: '', country: '', fromDate: '', toDate: '', theEvent: '', location: '', details: '', emailSubj: '', emailMsg: '', img: '', searchMsg: '', url: '' };

 const [values, setValues] = useState<Values>(initialValues);

 const handleChange = (e: any): void => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  });
 }

 const clearForm = (): void => {
  setValues({...initialValues});
 }

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

 const [imgUrl, setImgUrl] = useState<any>(null);
 const currentUser = getAuth();

 const handleUpload = async (): Promise<any> => {
  if (imgFile === null) return;
  try {
   const uploadTask = ref(storage, `${currentUser}/${imgFile}`);
   await uploadBytes(uploadTask, imgFile);
   const url = await getDownloadURL(uploadTask);
   setImgUrl(url);
  } catch (err) {
   alert(`Upload error: ${err}`);
  }
 }

 const dispatch = useDispatch();

 const handleDoc = async (collection: string, id: string | undefined, payload: any): Promise<any> => {
  console.log(fireDB);
  if (id !== undefined) {
    const docRef = doc(fireDB, collection, id);
    console.log(docRef);
    await setDoc(docRef, payload);
  }
 }

 const onSubmit = (e: any): void => {
  e.preventDefault();
  let payload;
  if (contactIsShown) {

   if (values.firstName == '' || values.lastName == '' || values.phone == '' || values.email == '' || values.address == '' || values.city == '' || values.stateProvince == '' || values.zipPostal == '' || values.country == '' || values.url == '') {
    alert("Please fill in all inputs to generate a QR Code for your contact form.");
    return;
   }

   const contactCard = `MECARD:N:${values.lastName},${values.firstName};ADR:${values.address},${values.city},${values.stateProvince},${values.zipPostal},${values.country};TEL:${values.phone};EMAIL:${values.email};URL:http://${values.url};;`;

   dispatch(addContactCode(values.id, values.firstName, values.lastName, contactCard));

   payload = { "id": values.id, "last": values.lastName, "first": values.firstName, "card": contactCard, "type": "contact" };

   handleDoc("contact codes", values.id, payload);
  }

  if (emailIsShown) {

   if (values.email == '' || values.emailSubj == '' || values.emailMsg == '') {
    alert("Please create an email to generate a QR Code.");
    return;
   }

   let fullEmail = `mailto:${values.email}?subject=${values.emailSubj}&body=${values.emailMsg}`;

   dispatch(addEmailCode(values.id, values.email, values.emailSubj, values.emailMsg, fullEmail));

   payload = { "id": values.id, "email": fullEmail, "subj": values.emailSubj, "to": values.email, "msg": values.emailMsg, "type": "email" };

   handleDoc("email codes", values.id, payload);
  }
  if (dateIsShown) {

   if (values.fromDate == '' || values.toDate == '' || values.theEvent == '' || values.location == '' || values.details == '') {
    alert("Please fill out the event form to generate a QR Code.");
    return;
   }

   dispatch(addDateCode(values.id, `${values.fromDate.replace(/-/g, "")}`, `${values.toDate.replace(/-/g, "")}`, values.theEvent.split(' ').join('+'), values.location.split(' ').join('+'), values.details.split(' ').join('+')));

   payload = { "id": values.id, "from": values.fromDate, "to": values.toDate, "event": values.theEvent, "location": values.location, "details": values.details, "type": "date" };

   handleDoc("date codes", values.id, payload);
  }
  if (imgIsShown) {

   if (values.img == '') {
    alert("Please select an image.");
    return;
   }

   const promise = new Promise(() => {
    handleUpload();
   });

   promise.then(() => {
    dispatch(addImgCode(values.id, values.img));
    payload = { "id": values.id, "img": values.img, "type": "img" };
    handleDoc("img codes", values.id, payload);
   }).catch(err => {
    alert(`Upload error: ${err}`);
   });

  }
  if (textIsShown) {

   if (values.searchMsg == '') {
    alert("Please enter a message to generate a QR Code.");
    return;
   }

   dispatch(addTextCode(values.id, values.searchMsg));

   payload = { "id": values.id, "text": values.searchMsg, "type": "text" };

   handleDoc("text codes", values.id, payload);
  }
  if (urlIsShown) {

   if (values.url == '') {
    alert("Please enter a url to generate a QR Code.");
    return;
   }

   let fullUrl = `https://${values.url}/`;

   dispatch(addUrlCode(values.id, fullUrl));

   payload = { "id": values.id, "url": fullUrl, "type": "url" };
   
   handleDoc("url codes", values.id, payload);
  }
  clearForm();
  setRefresh(!refresh);
  console.log(store.getState());
 }

 const displayProps = { showContactForm, showDateForm, showEmailForm, showImgForm, showTextForm, showUrlForm };
 const formProps = { values, handleChange };
 
 return (
  <div>
   <SideBar {...displayProps}/>
   <form onSubmit={onSubmit}>
    {contactIsShown && <ContactForm {...formProps}/>} 
    {dateIsShown && <DateForm {...formProps}/>}
    {emailIsShown && <EmailForm {...formProps}/>}
    {imgIsShown && <ImgForm {...formProps}/>}
    {textIsShown && <TextForm {...formProps}/>}
    {urlIsShown && <UrlForm {...formProps}/>}
    <br/>
    <br/>
    <button type="submit">Generate QR Code</button>
   </form>
   <br/>
   <br/>
   <br/>
   <br/>
  </div>
 );
}

export interface FormInterface {
 values: Values;
 handleChange: (e: any) => void;
};