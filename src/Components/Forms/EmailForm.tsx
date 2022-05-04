import React from 'react';
import { FormInterface } from "../../Pages/HomePage";

export default function EmailForm({ values, handleChange }: FormInterface) {

 return (
  <div>
   <h4>Send an e-mail:</h4>
     <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Enter e-mail address" required/>
     <br/>
     <br/>
     <input type="text" name="emailSubj" value={values.emailSubj} onChange={handleChange} placeholder='Enter e-mail subject'/>
     <br/>
     <br/>
     <textarea name="emailMsg" value={values.emailMsg} onChange={handleChange} rows={10} cols={40} placeholder='Enter your message here'/>
  </div>
 );
}