import React, { useState, useEffect } from 'react';
var QRCode = require('qrcode.react');

export default function QR() {

 const [url, setUrl] = useState('');
 return (
  <div>
   <h4>Enter a website:</h4>
   <input placeholder='www.website.com'/>
   <br/>
   <br/>
   <QRCode value="http://nbc.com/" />
  </div>
 );
}