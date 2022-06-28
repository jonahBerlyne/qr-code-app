import React, { useEffect } from 'react';
import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Home.css";

export default function UrlForm({ values, handleChange, setQRValue }: FormInterface) {

 useEffect(() => {
  setQRValue(`https://${values.url}/`);
 }, [values]);

 return (
  <div data-testid="urlForm" className="input-group url-form">
    <h4 className="url-form-header">Enter a website:</h4>
    <div className="url-input-container">
      <div className="input-group-prepend">
        <span className="input-group-text">https://</span>
      </div>
      <input type="text" data-testid="urlInput" className="form-control url-input" placeholder="Please enter a website" aria-label="Please enter a website" maxLength={50} name="url" value={values.url} onChange={handleChange} required />
      <div className="input-group-append">
        <span className="input-group-text">/</span>
      </div>
    </div>
  </div>
 );
}