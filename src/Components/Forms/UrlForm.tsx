import React from 'react';
import { FormInterface } from "../QR";

export default function UrlForm({ values, handleChange }: FormInterface) {
 return (
  <div>
    <h4>Enter a website:</h4>
     <label>https:// </label>
      <input type="text" pattern="[Ww]{3}\.([A-Za-z0-9]{2,})+\.[Cc][Oo][Mm]" name="url" value={values.url} onChange={handleChange} placeholder='Please enter a website'/>
     <label> /</label>
  </div>
 );
}