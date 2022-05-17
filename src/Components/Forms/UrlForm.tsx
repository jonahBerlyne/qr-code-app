import React from 'react';
import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Url.css";

export default function UrlForm({ values, handleChange }: FormInterface) {
 return (
  <div className="input-group url-input-form">
    <p className="url-input-header">Enter a website:</p>
    <div className="url-input-container">
      <div className="input-group-prepend">
        <span className="input-group-text">https://</span>
      </div>
      <input type="text" className="form-control url-input" placeholder="Please enter a website" aria-label="Please enter a website" maxLength={50} name="url" value={values.url} onChange={handleChange} required />
      <div className="input-group-append">
        <span className="input-group-text">/</span>
      </div>
    </div>
  </div>
 );
}