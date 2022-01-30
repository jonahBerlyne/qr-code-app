import React, { useState, useEffect } from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addQRCode } from '../Redux/Actions';
import SideBar from './Sidebar/SideBar';
import UrlForm from './Forms/UrlForm';

export default function QR() {

 const [email, setEmail] = useState(false);
 const [images, setImages] = useState(false);
 const [text, setText] = useState(false);
 const [url, setUrl] = useState(false);
 const [urlInput, setUrlInput] = useState('');

 const [refresh, setRefresh] = useState(false);

 const showEmailForm = () => {
  setUrl(false);
  setRefresh(!refresh);
 }

 const showImagesForm = () => {
  setUrl(false);
  setRefresh(!refresh);
 }

 const showTextForm = () => {
  setUrl(false);
  setRefresh(!refresh);
 }

 const showUrlForm = () => {
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
   {url && <UrlForm onSubmit={onSubmit} urlInput={urlInput} urlInputChange={urlInputChange}/>}
   <br/>
   <br/>
   <br/>
   <br/>
  </div>
 );
}