import React, { useState, useEffect } from 'react';
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
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
import { QRCodeCanvas } from 'qrcode.react';
import Header from '../Components/Header';
import { ContactPage, CalendarMonth, Email, CameraAlt, Search, Link, QrCodeScanner, Logout } from "@mui/icons-material";
import Icon from "../Components/Sidebar/Icon";

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
 const [qrIsShown, setQRIsShown] = useState<boolean>(false);

 const [contactIsShown, setContactIsShown] = useState<boolean>(false);
 const [dateIsShown, setDateIsShown] = useState<boolean>(true);
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
   const uploadTask = ref(storage, `${getAuth().currentUser?.uid}/${imgFile.name}`);
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
  const docRef = doc(fireDB, "users", `${getAuth().currentUser?.uid}`, codes, id);
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

 const [qrValue, setQRValue] = useState<string>("");

 const sidebarProps = { showContactForm, showDateForm, showEmailForm, showImgForm, showTextForm, showUrlForm };
 const formProps = { values, handleChange, setQRValue };
 const imgProps = { choosePic, imgFile, imgFileErr, imgPreview };
  
 return (
   <div className="home">

    {/* Use the gmail app header for a generic green header with the title on the left and on the right, options for the codes page and to logout */}
    <Header />

    {/* Beneath the header, include the qr code option icons */}
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
    {/* Beneath that, include the input form and qr code side-by-side */}
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
          <button className='btn btn-success save-code-btn'>Save QR Code</button>
        </div>
      }
    </div>
    {/* Beneath the qr code, include a save code button which will redirect to the code page with the qr code */}
     {/* {noForm && <h2 className='no-form'>Click an option from the sidebar and create your own QR code!</h2>} */}
     {/* <Sidebar {...sidebarProps} /> */}

     {/* <input type="text" value={qrVal} onChange={e => setQrVal(e.target.value)} />

     <QRCodeCanvas value={qrVal} /> */}

      {/* {qrIsShown && 
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
      } */} 
     {/* <br/>
     <br/>
     {!noForm && !qrIsShown && <button data-testid="submitCodeBtn" type="submit" onClick={submitCode} className="btn btn-success qr-code-btn">Generate QR Code</button>} */}
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
 setQRValue: React.Dispatch<React.SetStateAction<string>>;
};