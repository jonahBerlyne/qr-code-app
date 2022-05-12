import React from 'react';
import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Search.css";

export default function TextForm({ values, handleChange }: FormInterface) {
 return (
  <div className='search-input-form'>
    <h4 className="search-input-header">Search:</h4>
    <textarea name="searchMsg" className="form-control search-input" value={values.searchMsg} onChange={handleChange} rows={5} cols={40} placeholder='Enter your search value here...'/>
  </div>
 );
}