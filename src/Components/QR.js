import React, { useState, useEffect } from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addQRCode } from '../Redux/Actions';
import SideBar from './Sidebar/SideBar';
import EmailForm from './Forms/EmailForm';
import ImagesForm from './Forms/ImagesForm';
import TextForm from './Forms/TextForm';
import UrlForm from './Forms/UrlForm';

export default function QR() {

 const [email, setEmail] = useState(false);
 const [images, setImages] = useState(false);
 const [text, setText] = useState(false);
 const [url, setUrl] = useState(false);
 const [urlInput, setUrlInput] = useState('');

 const [refresh, setRefresh] = useState(false);

 const showEmailForm = () => {
  setImages(false);
  setText(false);
  setUrl(false);
  setEmail(true);
  setRefresh(!refresh);
 }

 const showImagesForm = () => {
  setEmail(false);
  setText(false);
  setUrl(false);
  setImages(true);
  setRefresh(!refresh);
 }

 const showTextForm = () => {
  setEmail(false);
  setImages(false);
  setUrl(false);
  setText(true);
  setRefresh(!refresh);
 }

 const showUrlForm = () => {
  setEmail(false);
  setImages(false);
  setText(false);
  setUrl(true);
  setRefresh(!refresh);
 }

 const urlInputChange = e => {
  setUrlInput(e.target.value);
 }

 const onSubmit = e => {
  e.preventDefault();
  if (urlInput == '') {
   alert("Please enter a url to generate a QR Code.");
   return;
  }
  let fullUrl = `https://${urlInput}/`;
  store.dispatch(addQRCode(uniqid(), fullUrl));
  setRefresh(!refresh);
  console.log(store.getState());
  setUrlInput('');
 }

 return (
  <div>
   <SideBar showEmailForm={showEmailForm} showImagesForm={showImagesForm} showTextForm={showTextForm} showUrlForm={showUrlForm}/>
   {email && <EmailForm onSubmit={onSubmit}/>}
   {images && <ImagesForm onSubmit={onSubmit}/>}
   {text && <TextForm onSubmit={onSubmit}/>}
   {url && <UrlForm onSubmit={onSubmit} urlInput={urlInput} urlInputChange={urlInputChange}/>}
   <br/>
   <br/>
   <br/>
   <br/>
  </div>
 );
}