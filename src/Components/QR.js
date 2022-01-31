import React, { useState, useEffect} from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addEmailCode, addDateCode, addTextCode, addUrlCode } from '../Redux/Actions';
import SideBar from './Sidebar/SideBar';
import DateForm from './Forms/DateForm';
import EmailForm from './Forms/EmailForm';
import TextForm from './Forms/TextForm';
import UrlForm from './Forms/UrlForm';

export default function QR() {

 const [email, setEmail] = useState(false);
 const [emailAddress, setEmailAddress] = useState('');
 const [emailSubject, setEmailSubject] = useState('');
 const [emailMsg, setEmailMsg] = useState('');

 const [date, setDate] = useState(false);
 const [fromDateInput, setFromDateInput] = useState('');
 const [toDateInput, setToDateInput] = useState('');
 const [eventInput, setEventInput] = useState('');
 const [locationInput, setLocationInput] = useState('');
 const [detailsInput, setDetailsInput] = useState('');

 const [text, setText] = useState(false);
 const [textInput, setTextInput] = useState('');

 const [url, setUrl] = useState(false);
 const [urlInput, setUrlInput] = useState('');

 const [refresh, setRefresh] = useState(false);

 const showEmailForm = () => {
  setDate(false);
  setText(false);
  setUrl(false);
  setEmail(true);
  setRefresh(!refresh);
 }

 const showDateForm = () => {
  setEmail(false);
  setText(false);
  setUrl(false);
  setDate(true);
  setRefresh(!refresh);
 }

 const showTextForm = () => {
  setEmail(false);
  setDate(false);
  setUrl(false);
  setText(true);
  setRefresh(!refresh);
 }

 const showUrlForm = () => {
  setEmail(false);
  setDate(false);
  setText(false);
  setUrl(true);
  setRefresh(!refresh);
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

 const formProps = { showDateForm, showEmailForm, showTextForm, showUrlForm };
 const dateProps = { fromDateInput, fromDateInputChange, toDateInput, toDateInputChange, eventInput, eventInputChange, locationInput, locationInputChange, detailsInput, detailsInputChange };
 const emailProps = { emailAddress, emailAddressChange, emailSubject, emailSubjectChange, emailMsg, emailMsgChange };
 const textProps = { textInput, textInputChange };
 const urlProps = { urlInput, urlInputChange };

 return (
  <div>
   <SideBar {...formProps}/>
   <form onSubmit={onSubmit}>
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