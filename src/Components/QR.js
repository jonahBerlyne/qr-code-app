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
  let fullUrl = `https://${url}/`;
  store.dispatch(addQRCode(uniqid(), fullUrl));
  setRefresh(!refresh);
  console.log(store.getState());
  setUrl('');
 }

 return (
  <div>
   <h4>Enter a website:</h4>
   <form onSubmit={onSubmit}>
    <label>https:// </label>
    <input type="text" pattern="[Ww]{3}\.([A-Za-z0-9]{2,})+\.[Cc][Oo][Mm]" value={url} onChange={handleChange} placeholder='Please enter a website'/>
    <label> /</label>
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