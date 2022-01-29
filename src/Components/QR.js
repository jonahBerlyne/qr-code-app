import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import uniqid from "uniqid";

export default function QR() {

 const [url, setUrl] = useState('');
 const [value, setValue] = useState('');
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
  setQrs(qrs => [...qrs, {id: uniqid(), url: url}]);
  setValue(url);
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
   {qrs.map(item => {
    return (
     <div key={item.id}>
      <QRCode value={item.url}/>
      <h3>{item.url}</h3>
      {console.log(qrs)}
     </div>
    );
   })}
  </div>
 );
}