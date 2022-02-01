import React, { useState, useEffect} from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addContactCode, addDateCode, addEmailCode, addTextCode, addUrlCode } from '../Redux/Actions';
import SideBar from './Sidebar/SideBar';
import ContactForm from './Forms/ContactForm';
import DateForm from './Forms/DateForm';
import EmailForm from './Forms/EmailForm';
import TextForm from './Forms/TextForm';
import UrlForm from './Forms/UrlForm';

export default function QR() {
 const [contact, setContact] = useState(false);
 const [firstInput, setFirstInput] = useState('');
 const [lastInput, setLastInput] = useState('');
 const [phoneInput, setPhoneInput] = useState('');
 // email address
 const [streetInput, setStreetInput] = useState('');
 const [cityInput, setCityInput] = useState('');
 const [stateInput, setStateInput] = useState('');
 const [zipInput, setZipInput] = useState('');
 const [countryInput, setCountryInput] = useState('');
 // url


 const [date, setDate] = useState(false);
 const [fromDateInput, setFromDateInput] = useState('');
 const [toDateInput, setToDateInput] = useState('');
 const [eventInput, setEventInput] = useState('');
 const [locationInput, setLocationInput] = useState('');
 const [detailsInput, setDetailsInput] = useState('');

 const [email, setEmail] = useState(false);
 const [emailAddress, setEmailAddress] = useState('');
 const [emailSubject, setEmailSubject] = useState('');
 const [emailMsg, setEmailMsg] = useState('');

 const [text, setText] = useState(false);
 const [textInput, setTextInput] = useState('');

 const [url, setUrl] = useState(false);
 const [urlInput, setUrlInput] = useState('');

 const [refresh, setRefresh] = useState(false);

 const showContactForm = () => {
  setDate(false);
  setEmail(false);
  setText(false);
  setUrl(false);
  setContact(true);
  setRefresh(!refresh);
 }
 
 const showDateForm = () => {
  setContact(false);
  setEmail(false);
  setText(false);
  setUrl(false);
  setDate(true);
  setRefresh(!refresh);
 }

 const showEmailForm = () => {
  setContact(false);
  setDate(false);
  setText(false);
  setUrl(false);
  setEmail(true);
  setRefresh(!refresh);
 }


 const showTextForm = () => {
  setContact(false);
  setDate(false);
  setEmail(false);
  setUrl(false);
  setText(true);
  setRefresh(!refresh);
 }

 const showUrlForm = () => {
  setContact(false);
  setDate(false);
  setEmail(false);
  setText(false);
  setUrl(true);
  setRefresh(!refresh);
 }

 const firstInputChange = e => {
  setFirstInput(e.target.value);
 }

 const lastInputChange = e => {
  setLastInput(e.target.value);
 }

 const phoneInputChange = e => {
  setPhoneInput(e.target.value);
 }

 const streetInputChange = e => {
  setStreetInput(e.target.value);
 }

 const cityInputChange = e => {
  setCityInput(e.target.value);
 }

 const stateInputChange = e => {
  setStateInput(e.target.value);
 }

 const zipInputChange = e => {
  setZipInput(e.target.value);
 }

 const countryInputChange = e => {
  setCountryInput(e.target.value);
 }

 const emailAddressChange = e => {
  setEmailAddress(e.target.value);
 }

 const emailSubjectChange = e => {
  setEmailSubject(e.target.value);
 }

 const emailMsgChange = e => {
  setEmailMsg(e.target.value);
 }

 const fromDateInputChange = e => {
  setFromDateInput(e.target.value);
 }

 const toDateInputChange = e => {
  setToDateInput(e.target.value);
 }

 const eventInputChange = e => {
  setEventInput(e.target.value);
 }

 const locationInputChange = e => {
  setLocationInput(e.target.value);
 }

 const detailsInputChange = e => {
  setDetailsInput(e.target.value);
 }

 const textInputChange = e => {
  setTextInput(e.target.value);
 }

 const urlInputChange = e => {
  setUrlInput(e.target.value);
 }

 const onSubmit = e => {
  e.preventDefault();
  if (contact) {
   if (firstInput == '' || lastInput == '' || phoneInput == '' || emailAddress == '' || streetInput == '' || cityInput == '' || stateInput == '' || zipInput == '' || countryInput == '' || urlInput == '') {
    alert("Please fill in all inputs to generate a QR Code for your contact form.");
    return;
   }
   let card = `
      BEGIN:VCARD\n
      VERSION:4.0\n
      N:${lastInput};${firstInput};;;\n
      FN: ${firstInput} ${lastInput}\n
      TEL;TYPE=home,voice;VALUE=uri:tel:+${phoneInput}\n
      ADR;TYPE=home;LABEL="${streetInput}\n${cityInput}, ${stateInput} ${zipInput}\n${countryInput}":;;${streetInput};${cityInput};${stateInput};${zipInput};${countryInput}\n
      EMAIL:${emailAddress}\n
      WEBSITE:${urlInput}\n
      END:VCARD
      `
   store.dispatch(addContactCode(uniqid(), firstInput, lastInput, phoneInput, emailAddress, streetInput, cityInput, stateInput, zipInput, countryInput, urlInput, card));
   setFirstInput('');
   setLastInput('');
   setPhoneInput('');
   setEmailAddress('');
   setStreetInput('');
   setCityInput('');
   setStateInput('');
   setZipInput('');
   setCountryInput('');
   setUrlInput('');
  }
  if (email) {
   if (emailAddress == '' || emailSubject == '' || emailMsg == '') {
    alert("Please create an email to generate a QR Code.");
    return;
   }
   let fullEmail = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailMsg}`;
   store.dispatch(addEmailCode(uniqid(), emailAddress, emailSubject, emailMsg, fullEmail));
   setEmailAddress('');
   setEmailSubject('');
   setEmailMsg('');
  }
  if (date) {
   if (fromDateInput == '' || toDateInput == '' || eventInput == '' || locationInput == '' || detailsInput == '') {
    alert("Please fill out the event form to generate a QR Code.");
    return;
   }
   store.dispatch(addDateCode(uniqid(), `${fromDateInput.replace(/-/g, "")}`, `${toDateInput.replace(/-/g, "")}`, eventInput.split(' ').join('+'), locationInput.split(' ').join('+'), detailsInput.split(' ').join('+')));
   setFromDateInput('');
   setToDateInput('');
   setEventInput('');
   setLocationInput('');
   setDetailsInput('');
  }
  if (text) {
   if (textInput == '') {
    alert("Please enter a message to generate a QR Code.");
    return;
   }
   store.dispatch(addTextCode(uniqid(), textInput));
   setTextInput('');
  }
  if (url) {
   if (urlInput == '') {
    alert("Please enter a url to generate a QR Code.");
    return;
   }
   let fullUrl = `https://${urlInput}/`;
   store.dispatch(addUrlCode(uniqid(), fullUrl));
   setUrlInput('');
  }
  setRefresh(!refresh);
  console.log(store.getState());
 }

 const formProps = { showContactForm, showDateForm, showEmailForm, showTextForm, showUrlForm };
 const urlProps = { urlInput, urlInputChange };
 const contactProps = { firstInput, firstInputChange, lastInput, lastInputChange, phoneInput, phoneInputChange, emailAddress, emailAddressChange, streetInput, streetInputChange, cityInput, cityInputChange, stateInput, stateInputChange, zipInput, zipInputChange, countryInput, countryInputChange, ...urlProps };
 const dateProps = { fromDateInput, fromDateInputChange, toDateInput, toDateInputChange, eventInput, eventInputChange, locationInput, locationInputChange, detailsInput, detailsInputChange };
 const emailProps = { emailAddress, emailAddressChange, emailSubject, emailSubjectChange, emailMsg, emailMsgChange };
 const textProps = { textInput, textInputChange };

 return (
  <div>
   <SideBar {...formProps}/>
   <form onSubmit={onSubmit}>
    {contact && <ContactForm {...contactProps}/>}
    {date && <DateForm {...dateProps}/>}
    {email && <EmailForm {...emailProps}/>}
    {text && <TextForm {...textProps}/>}
    {url && <UrlForm {...urlProps}/>}
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