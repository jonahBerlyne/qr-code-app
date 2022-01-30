import React, { useState, useEffect } from 'react';

export default function UrlForm({onSubmit, urlInput, urlInputChange}) {
 return (
  <div>
   <h4>Enter a website:</h4>
   <form onSubmit={onSubmit}>
     <label>https:// </label>
      <input type="text" pattern="[Ww]{3}\.([A-Za-z0-9]{2,})+\.[Cc][Oo][Mm]" value={urlInput} onChange={urlInputChange} placeholder='Please enter a website'/>
     <label> /</label>
    <br/>
    <br/>
    <button type="submit">Generate QR Code</button>
   </form>
  </div>
 );
}