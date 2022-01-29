import React, { useState, useEffect } from 'react';
var QRCode = require('qrcode.react');

export default function QR() {

 const [url, setUrl] = useState('');
 console.log(`url is: ${url}`);
 const [refresh, setRefresh] = useState(false);

 const [qrs, setQrs] = useState([]);

 const handleChange = e => {
  setUrl(e.target.value);
 }

 const [empty, setEmpty] = useState(true);

 const onSubmit = e => {
  e.preventDefault();
  if (url == '') {
   alert("Please enter a url to generate a QR Code.");
   return;
  }
  setQrs(qrs => [...qrs, url]);
  setEmpty(false);
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
   {!empty && <QRCode value={url} />}
  </div>
 );
}