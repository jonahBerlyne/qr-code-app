import React, { useEffect } from 'react';
import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Home.css";

export default function TextForm({ values, handleChange, setQRValue }: FormInterface) {

 useEffect(() => {
  setQRValue(values.searchMsg);
 }, [values]);

 return (
  <div data-testid="searchForm" className='search-form'>
    <h4 className="search-form-header">Search:</h4>
    <textarea name="searchMsg" data-testid="searchMsg" className="form-control search-input" value={values.searchMsg} onChange={handleChange} rows={5} cols={50} maxLength={200} placeholder='Enter your search value here...'/> 
  </div>
 );
}