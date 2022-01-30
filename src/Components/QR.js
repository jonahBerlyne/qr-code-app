import React, { useState, useEffect } from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addQRCode } from '../Redux/Actions';
import SideBar from './Sidebar/SideBar';
import UrlForm from './Forms/UrlForm';

export default function QR() {

 const [url, setUrl] = useState('');
 const [refresh, setRefresh] = useState(false);

 const handleChange = e => {
  setUrl(e.target.value);
 }

 const onSubmit = e => {
  e.preventDefault();
  if (url == '') {
   alert("Please enter a url to generate a QR Code.");
   return;
  }
  let fullUrl = `https://${url}/`;
  store.dispatch(addQRCode(uniqid(), fullUrl));
  setRefresh(!refresh);
  console.log(store.getState());
  setUrl('');
 }

 return (
  <div>
   <SideBar/>
   <UrlForm onSubmit={onSubmit} url={url} handleChange={handleChange}/>
   <br/>
   <br/>
   <br/>
   <br/>
  </div>
 );
}