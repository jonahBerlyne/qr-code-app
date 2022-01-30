import React, { useState, useEffect } from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addImgCode, addTextCode, addUrlCode } from '../Redux/Actions';
import SideBar from './Sidebar/SideBar';
import EmailForm from './Forms/EmailForm';
import ImagesForm from './Forms/ImagesForm';
import TextForm from './Forms/TextForm';
import UrlForm from './Forms/UrlForm';

export default function QR() {

 const [email, setEmail] = useState(false);

 const [images, setImages] = useState(false);
 const [imgInput, setImgInput] = useState([]);
 const [imgSrc, setImgSrc] = useState([]);

 const [text, setText] = useState(false);
 const [textInput, setTextInput] = useState('');

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

 const imgInputChange = e => {
  setImgInput([...e.target.files]);
 }

 useEffect(() => {
  if (imgInput.length < 1) return;
  const newImgUrl = [];
  imgInput.forEach(img => newImgUrl.push(URL.createObjectURL(img)));
  setImgSrc(newImgUrl);
 }, [imgInput]);

 const textInputChange = e => {
  setTextInput(e.target.value);
 }

 const urlInputChange = e => {
  setUrlInput(e.target.value);
 }

 const onSubmit = e => {
  e.preventDefault();
  if (images) {
   if (imgInput.length === 0) {
    alert("Please upload an image to generate a QR Code.");
    return;
   }
   store.dispatch(addImgCode(uniqid(), imgSrc.toString()));
   setImgInput([]);
   setImgSrc([]);
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

 return (
  <div>
   <SideBar showEmailForm={showEmailForm} showImagesForm={showImagesForm} showTextForm={showTextForm} showUrlForm={showUrlForm}/>
   <form onSubmit={onSubmit}>
    {email && <EmailForm/>}
    {images && <ImagesForm imgSrc={imgSrc} imgInputChange={imgInputChange}/>}
    {text && <TextForm textInput={textInput} textInputChange={textInputChange}/>}
    {url && <UrlForm urlInput={urlInput} urlInputChange={urlInputChange}/>}
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