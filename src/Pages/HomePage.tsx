import React, { useState, useEffect } from 'react';
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import uniqid from "uniqid";
import ContactForm from "../Components/Forms/ContactForm";
import DateForm from "../Components/Forms/DateForm";
import EmailForm from "../Components/Forms/EmailForm";
import ImgForm from "../Components/Forms/ImgForm";
import TextForm from "../Components/Forms/TextForm";
import UrlForm from "../Components/Forms/UrlForm";
import fireDB, { storage } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { QRCodeCanvas } from 'qrcode.react';
import Header from '../Components/Header';
import { ContactPage, CalendarMonth, Email, CameraAlt, Search, Link } from "@mui/icons-material";
import Icon from "../Components/Icon";

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

 const [noForm, setNoForm] = useState<boolean>(true);

 const [contactIsShown, setContactIsShown] = useState<boolean>(false);
 const [dateIsShown, setDateIsShown] = useState<boolean>(false);
 const [emailIsShown, setEmailIsShown] = useState<boolean>(false);
 const [imgIsShown, setImgIsShown] = useState<boolean>(false);
 const [textIsShown, setTextIsShown] = useState<boolean>(false);
 const [urlIsShown, setUrlIsShown] = useState<boolean>(false);

 const showContactForm = (): void => {
  if (noForm) setNoForm(false);
  if (dateIsShown) setDateIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (textIsShown) setTextIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setContactIsShown(true);
 }
 
 const showDateForm = (): void => {
  if (noForm) setNoForm(false);
  if (contactIsShown) setContactIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (textIsShown) setTextIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setDateIsShown(true);
 }

 const showEmailForm = (): void => {
  if (noForm) setNoForm(false);
  if (contactIsShown) setContactIsShown(false);
  if (dateIsShown) setDateIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (textIsShown) setTextIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setEmailIsShown(true);
 }

 const showImgForm = (): void => {
  if (noForm) setNoForm(false);
  if (contactIsShown) setContactIsShown(false);
  if (dateIsShown) setDateIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (textIsShown) setTextIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setImgIsShown(true);
 }


 const showTextForm = (): void => {
  if (noForm) setNoForm(false);
  if (contactIsShown) setContactIsShown(false);
  if (dateIsShown) setDateIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (urlIsShown) setUrlIsShown(false);
  setTextIsShown(true);
 }

 const showUrlForm = (): void => {
  if (noForm) setNoForm(false);
  if (contactIsShown) setContactIsShown(false);
  if (dateIsShown) setDateIsShown(false);
  if (emailIsShown) setEmailIsShown(false);
  if (imgIsShown) setImgIsShown(false);
  if (textIsShown) setTextIsShown(false);
  setUrlIsShown(true);
 }

 const [imgFile, setImgFile] = useState<any>(null);
 const [imgFileErr, setImgFileErr] = useState<string | null>(null);
 const types: string[] = ['image/png', 'image/jpeg'];
 const [imgPreview, setImgPreview] = useState<any>("/default_pic.jpeg");

 const choosePic = (e: any): void => {
  const image = e.target.files[0];
  if (image && types.includes(image.type)) {
   setImgFile(image);
   setImgFileErr(null);
  } else {
   setImgFile(null);
   setImgPreview("/default_pic.jpeg");
   setImgFileErr("Please choose an image file (png or jpeg)");
  }
 }

 useEffect(() => {
   if (imgFile) setImgPreview(URL.createObjectURL(imgFile));
 }, [imgFile]);

 const handleImgUpload = async (): Promise<any> => {
  if (imgFile === null) {
    alert("The image could not be saved.");
    return;
  }
  try {
   const uploadTask = ref(storage, `${getAuth().currentUser?.uid}/${imgFile.name}`);
   await uploadBytes(uploadTask, imgFile);
   const imgUrl = await getDownloadURL(uploadTask);
   const timestamp = serverTimestamp();
   const payload = { 
    "id": values.id,
    "info": {
      "name": imgFile.name,
    },
    "type": "img",
    "value": imgUrl, 
    timestamp
   };
   await handleDoc(values.id, payload);
  } catch (err) {
   alert(`Image code upload error: ${err}`);
  }
 }

 const handleDoc = async (id: any, codeDoc: any): Promise<any> => {
  const docRef = doc(fireDB, "users", `${getAuth().currentUser?.uid}`, "codes", id);
  await setDoc(docRef, codeDoc);
 }

 const [qrValue, setQRValue] = useState<string>("");

 const navigate = useNavigate();

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
     payload = { 
       "id": values.id,
       "info": {
         "last": values.lastName, 
         "first": values.firstName, 
       },
       "type": "contact",
       "value": qrValue, 
       timestamp
     };
     await handleDoc(values.id, payload);
   } catch (err) {
     alert(`Contact code upload error: ${err}`);
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
       "info": {
         "event": values.theEvent
       },
       "type": "date",
       "value": qrValue, 
       timestamp 
     };

     await handleDoc(values.id, payload);
   } catch (err) {
     alert(`Date code upload error: ${err}`);
   }
  }

  if (emailIsShown) {
   if (values.email === '' || values.emailSubj === '' || values.emailMsg === '') {
    alert("Please create an email to generate a QR Code.");
    return;
   }
   try {
     payload = {  
       "id": values.id,
       "info": {
         "subj": values.emailSubj,
         "to": values.email, 
       },
       "type": "email",
       "value": qrValue,
       timestamp 
     };
     await handleDoc(values.id, payload);
   } catch (err) {
     alert(`Email code upload error: ${err}`);
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
       "type": "search",
       "value": values.searchMsg, 
       timestamp 
     };
     await handleDoc(values.id, payload);
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
     payload = { 
       "id": values.id,
       "type": "url",
       "value": qrValue, 
       timestamp 
     };
     await handleDoc(values.id, payload);
   } catch (err) {
     alert(`Url code upload error: ${err}`);
   }
  }

  navigate(`/codes/${values.id}`);
 }

 const formProps = { values, handleChange, setQRValue };
 const imgProps = { choosePic, imgFileErr, imgPreview, setQRValue };
  
 return (
   <div className="home">
    <Header />
    <div className="icons-container">
      <Icon 
        color="rosybrown"
        icon={<ContactPage fontSize="large" />} 
        onClick={showContactForm}
        title="Contact" 
        testId="contactIcon" 
      />
      <Icon 
        color="red"
        icon={<CalendarMonth fontSize="large" />} 
        onClick={showDateForm}
        title="Date" 
        testId="dateIcon" 
      />
      <Icon 
        color="goldenrod"
        icon={<Email fontSize="large" />} 
        onClick={showEmailForm} 
        title="Email"
        testId="emailIcon" 
      />
      <Icon 
        color="darkslategray"
        icon={<CameraAlt fontSize="large" />} 
        onClick={showImgForm}
        title="Image" 
        testId="imgIcon" 
      />
      <Icon
        color="black" 
        icon={<Search fontSize="large" />} 
        onClick={showTextForm} 
        title="Search"
        testId="searchIcon" 
      />
      <Icon
        color="blue" 
        icon={<Link fontSize="large" />} 
        onClick={showUrlForm} 
        title="URL"
        testId="urlIcon" 
        />
    </div>
    {noForm && <h2 className='no-form-text'>Click an icon above and create your own QR code!</h2>}
    <div className="qr-container">
      <div className="form-container">
        {contactIsShown && <ContactForm {...formProps} />}
        {dateIsShown && <DateForm {...formProps}/>}
        {emailIsShown && <EmailForm {...formProps}/>}
        {imgIsShown && <ImgForm {...imgProps}/>}
        {textIsShown && <TextForm {...formProps}/>}
        {urlIsShown && <UrlForm {...formProps}/>}
      </div>
      {(contactIsShown || dateIsShown || emailIsShown || imgIsShown || textIsShown || urlIsShown) &&       
        <div className="qr-code-container">
          <QRCodeCanvas size={200} value={qrValue} />
          <button data-testid="submitCodeBtn" onClick={submitCode} className='btn btn-success save-code-btn'>Save QR Code</button>
        </div>
      }
    </div>
   </div>
 );
}

export interface FormInterface {
 values: Values;
 handleChange: (e: any) => void;
 setQRValue: React.Dispatch<React.SetStateAction<string>>;
};