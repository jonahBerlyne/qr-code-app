import React, { useState, useEffect } from 'react';

export default function EmailForm() {
 return (
  <div>
   <h4>Enter your e-mail:</h4>
    <input type="email" placeholder="Enter your e-mail address"/>
    <br/>
    <br/>
    <input type="text" placeholder='Enter e-mail subject'/>
    <br/>
    <br/>
    <textarea rows="10" cols="40" placeholder='Enter your message here'/>
  </div>
 );
}