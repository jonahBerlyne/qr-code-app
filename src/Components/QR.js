import React, { useState } from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addContactCode, addDateCode, addEmailCode, addTextCode, addUrlCode } from '../Redux/Actions';
import SideBar from './Sidebar/SideBar';
import ContactForm from './Forms/ContactForm';
import DateForm from './Forms/DateForm';
import EmailForm from './Forms/EmailForm';
import TextForm from './Forms/TextForm';
import UrlForm from './Forms/UrlForm';
import { handleDoc } from '../Firebase/Util';
import "firebase/storage";

export default function QR() {

 const initialValues = { id: uniqid(), firstName: '', lastName: '', phone: '', email: '', address: '', city: '', stateProvince: '', zipPostal: '', country: '', fromDate: '', toDate: '', theEvent: '', location: '', details: '', emailSubj: '', emailMsg: '', img: '', searchMsg: '', url: '' };

 const [values, setValues] = useState(initialValues);

 const handleChange = e => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  });
 }

 const clearForm = () => {
  setValues({...initialValues});
 }

 const [contactIsShown, setContactIsShown] = useState(false);
 const [dateIsShown, setDateIsShown] = useState(false);
 const [emailIsShown, setEmailIsShown] = useState(false);
 const [textIsShown, setTextIsShown] = useState(false);
 const [urlIsShown, setUrlIsShown] = useState(false);

 const [refresh, setRefresh] = useState(false);

 const showContactForm = () => {
  setDateIsShown(false);
  setEmailIsShown(false);
  setTextIsShown(false);
  setUrlIsShown(false);
  setContactIsShown(true);
  setRefresh(!refresh);
 }
 
 const showDateForm = () => {
  setContactIsShown(false);
  setEmailIsShown(false);
  setTextIsShown(false);
  setUrlIsShown(false);
  setDateIsShown(true);
  setRefresh(!refresh);
 }

 const showEmailForm = () => {
  setContactIsShown(false);
  setDateIsShown(false);
  setTextIsShown(false);
  setUrlIsShown(false);
  setEmailIsShown(true);
  setRefresh(!refresh);
 }


 const showTextForm = () => {
  setContactIsShown(false);
  setDateIsShown(false);
  setEmailIsShown(false);
  setUrlIsShown(false);
  setTextIsShown(true);
  setRefresh(!refresh);
 }

 const showUrlForm = () => {
  setContactIsShown(false);
  setDateIsShown(false);
  setEmailIsShown(false);
  setTextIsShown(false);
  setUrlIsShown(true);
  setRefresh(!refresh);
 }

 const onSubmit = e => {
  e.preventDefault();
  let payload;
  if (contactIsShown) {
   if (values.firstName == '' || values.lastName == '' || values.phone == '' || values.email == '' || values.address == '' || values.city == '' || values.stateProvince == '' || values.zipPostal == '' || values.country == '' || values.url == '') {
    alert("Please fill in all inputs to generate a QR Code for your contact form.");
    return;
   }
   let contactCard = `MECARD:N:${values.lastName},${values.firstName};ADR:${values.address},${values.city},${values.stateProvince},${values.zipPostal},${values.country};TEL:${values.phone};EMAIL:${values.email};URL:http://${values.url};;`
   store.dispatch(addContactCode(values.id, values.firstName, values.lastName, contactCard));
  }
  if (emailIsShown) {
   if (values.email == '' || values.emailSubj == '' || values.emailMsg == '') {
    alert("Please create an email to generate a QR Code.");
    return;
   }
   let fullEmail = `mailto:${values.email}?subject=${values.emailSubj}&body=${values.emailMsg}`;
   store.dispatch(addEmailCode(values.id, values.email, values.emailSubj, values.emailMsg, fullEmail));
   payload = { "id": values.id, "email": fullEmail, "subj": values.emailSubj, "to": values.email, "msg": values.emailMsg, "type": "email" };
   handleDoc("email codes", values.id, payload);
  }
  if (dateIsShown) {
   if (values.fromDate == '' || values.toDate == '' || values.theEvent == '' || values.location == '' || values.details == '') {
    alert("Please fill out the event form to generate a QR Code.");
    return;
   }
   store.dispatch(addDateCode(values.id, `${values.fromDate.replace(/-/g, "")}`, `${values.toDate.replace(/-/g, "")}`, values.theEvent.split(' ').join('+'), values.location.split(' ').join('+'), values.details.split(' ').join('+')));
   payload = { "id": values.id, "from": values.fromDate, "to": values.toDate, "event": values.theEvent, "location": values.location, "details": values.details, "type": "date" };
   handleDoc("date codes", values.id, payload);
  }
  if (textIsShown) {
   if (values.searchMsg == '') {
    alert("Please enter a message to generate a QR Code.");
    return;
   }
   store.dispatch(addTextCode(values.id, values.searchMsg));
   payload = { "id": values.id, "text": values.searchMsg, "type": "text" };
   handleDoc("text codes", values.id, payload);
  }
  if (urlIsShown) {
   if (values.url == '') {
    alert("Please enter a url to generate a QR Code.");
    return;
   }
   let fullUrl = `https://${values.url}/`;
   store.dispatch(addUrlCode(values.id, fullUrl));
   payload = { "id": values.id, "url": fullUrl, "type": "url" };
   handleDoc("url codes", values.id, payload);
  }
  clearForm();
  setRefresh(!refresh);
  console.log(store.getState());
 }

 const displayProps = { showContactForm, showDateForm, showEmailForm, showTextForm, showUrlForm };
 const formProps = { values, handleChange };
 
 return (
  <div>
   <SideBar {...displayProps}/>
   <form onSubmit={onSubmit}>
    {contactIsShown && <ContactForm {...formProps}/>} 
    {dateIsShown && <DateForm {...formProps}/>}
    {emailIsShown && <EmailForm {...formProps}/>}
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