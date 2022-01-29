import React, { useState, useEffect } from 'react';
import uniqid from "uniqid";
import store from '../Redux/Store';
import { addQRCode } from '../Redux/Actions';

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
  store.dispatch(addQRCode(uniqid(), url));
  setRefresh(!refresh);
  console.log(store.getState());
  setUrl('');
 }

 return (
  <div>
   <h4>Enter a website:</h4>
   <form onSubmit={onSubmit}>
    <input value={url} onChange={handleChange} placeholder='www.website.com'/>
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