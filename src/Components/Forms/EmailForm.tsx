import React from 'react';
import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Email.css";

export default function EmailForm({ values, handleChange }: FormInterface) {

 return (
  <div data-testid="emailForm" className='email-input-form'>
   <h4 className='email-input-form-header'>Send an e-mail:</h4>
   <div className="email-input-form-container">
     <div className="email-input-form-row">
      <div className="email-form-input">
        <p className="input-label">E-mail address:</p>
        <input type="email" className='form-control' name="email" value={values.email} onChange={handleChange} maxLength={30} placeholder="Enter e-mail address" required/>
      </div>
      <div className="email-form-input">
        <p className="input-label">Subject:</p>
        <input type="text" className='form-control' name="emailSubj" value={values.emailSubj} onChange={handleChange} maxLength={20} placeholder='Enter e-mail subject'/>
      </div>
     </div>
     <div className="email-form-input">
      <p className="input-label">Message:</p>
      <textarea name="emailMsg" className='form-control' value={values.emailMsg} onChange={handleChange} rows={5} cols={40} maxLength={50} placeholder='Enter your message here...'/>
     </div>
   </div>
  </div>
 );
}