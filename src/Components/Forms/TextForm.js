import React, { useState, useEffect } from 'react';

export default function TextForm({onSubmit, textInput, textInputChange}) {
 return (
  <div>
   <h4>Enter a message:</h4>
   <form onSubmit={onSubmit}>
    <textarea value={textInput} onChange={textInputChange} rows="10" cols="40" placeholder='Enter your message here'/>
    <br/>
    <br/>
    <button type="submit">Generate QR Code</button>
   </form>
  </div>
 );
}