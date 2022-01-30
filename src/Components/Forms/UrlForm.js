import React from 'react';

export default function UrlForm({urlInput, urlInputChange}) {
 return (
  <div>
    <h4>Enter a website:</h4>
     <label>https:// </label>
      <input type="text" pattern="[Ww]{3}\.([A-Za-z0-9]{2,})+\.[Cc][Oo][Mm]" value={urlInput} onChange={urlInputChange} placeholder='Please enter a website'/>
     <label> /</label>
  </div>
 );
}