import React, { useEffect } from 'react';
import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Home.css";

export default function EmailForm({ values, handleChange, setQRValue }: FormInterface) {

 useEffect(() => {
  setQRValue(`mailto:${values.email}?subject=${values.emailSubj}&body=${values.emailMsg}`);
 }, [values]);

 return (
  <div data-testid="emailForm" className='email-form'>
   <h4 className='email-form-header'>Send an e-mail:</h4>
   <div className="email-form-inputs">
     <div className="email-form-input-row">
      <div className="email-form-input">
        <p className="input-label">E-mail address:</p>
        <input type="email" data-testid="Email" className='form-control' name="email" value={values.email} onChange={handleChange} maxLength={30} placeholder="Enter e-mail address" required/>
      </div>
      <div className="email-form-input">
        <p className="input-label">Subject:</p>
        <input type="text" data-testid="emailSubj" className='form-control' name="emailSubj" value={values.emailSubj} onChange={handleChange} maxLength={40} placeholder='Enter e-mail subject'/>
      </div>
     </div>
     <div className="email-form-input">
      <p className="input-label">Message:</p>
      <textarea name="emailMsg" data-testid="emailMsg" className='form-control' value={values.emailMsg} onChange={handleChange} rows={5} cols={40} maxLength={50} placeholder='Enter your message here...'/>
     </div>
   </div>
  </div>
 );
}