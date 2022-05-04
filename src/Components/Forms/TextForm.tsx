import React from 'react';
import { FormInterface } from "../../Pages/HomePage";

export default function TextForm({ values, handleChange }: FormInterface) {
 return (
  <div>
    <h4>Enter a message:</h4>
    <textarea name="searchMsg" value={values.searchMsg} onChange={handleChange} rows={10} cols={40} placeholder='Enter your message here'/>
  </div>
 );
}