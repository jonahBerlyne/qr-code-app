import React, { useState, useEffect } from 'react';
import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Date.css";

export default function DateForm({ values, handleChange }: FormInterface) {

 const [currentDate, setCurrentDate] = useState<string>("");

 useEffect(() => {
   const date = new Date();
   let dd: string | number = date.getDate();
   let mm: string | number = date.getMonth() + 1; // January is 0
   const yyyy: number = date.getFullYear();
  
   if (dd < 10) dd = '0' + dd;
   if (mm < 10) mm = '0' + mm;
   setCurrentDate(`${yyyy}-${mm}-${dd}`);

   return () => {
      setCurrentDate("");
   }
 }, []);

 return (
  <div className='date-input-form'>
   <h4 className='date-input-form-header'>Set an event:</h4>
   <div className="date-form-inputs-container">
    <div className="date-inputs">
      <div className="date-form-input">
        <p className="input-label">From:</p>
        <input type="date" className='form-control date-input' min={currentDate} name="fromDate" value={values.fromDate} onChange={handleChange} required/>
      </div>
      <div className="date-form-input">
        <p className="input-label">To:</p>
        <input type="date" className='form-control date-input' min={currentDate} name="toDate" value={values.toDate} onChange={handleChange} required/>
      </div>
    </div>
    <div className="date-form-inputs">
      <div className="date-form-input">
        <p className="input-label">Event:</p>
        <input type="text" className='form-control' name="theEvent" value={values.theEvent} onChange={handleChange} placeholder='Enter an event here'/>
      </div>
      <div className="date-form-input">
        <p className="input-label">Location:</p>
        <input type="text" className='form-control' name="location" value={values.location} onChange={handleChange} placeholder='Enter event location'/>
      </div>
    </div>
    <div className="date-form-input details-input">
      <p className="input-label">Details:</p>
      <textarea name="details" className='form-control' value={values.details} onChange={handleChange} rows={5} cols={40} placeholder='Enter event details here...'/>
    </div>
   </div>
  </div>
 );
}