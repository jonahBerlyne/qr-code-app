import React, { useState, useEffect } from 'react';
import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Home.css";

export default function DateForm({ values, handleChange, setQRValue }: FormInterface) {

 const [currentDate, setCurrentDate] = useState<string>("");

 useEffect(() => {
   const date = new Date();
   let dd: string | number = date.getDate();
   let mm: string | number = date.getMonth() + 1; // January is 0
   const yyyy: number = date.getFullYear();
  
   if (dd < 10) dd = '0' + dd;
   if (mm < 10) mm = '0' + mm;
   setCurrentDate(`${yyyy}-${mm}-${dd}`);
 }, []);
  
 useEffect(() => {
   const details = values.details.split(' ').join('+');
   const fromDate = values.fromDate.replace(/-/g, "");
   const location = values.location.split(' ').join('+');
   const toDate = values.toDate.replace(/-/g, "");
   const theEvent = values.theEvent.split(' ').join('+');
 
   setQRValue(`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${fromDate}/${parseInt(toDate) + 1}&text=${theEvent}&location=${location}&details=${details}`);
 }, [values]);

 return (
  <div data-testid="dateForm" className='date-form'>
   <h4 className='date-form-header'>Set an event:</h4>
   <div className="date-form-inputs-container">
    <div className="date-inputs">
      <div className="date-form-input">
        <p className="input-label">From:</p>
        <input type="date" data-testid="fromDate" className='form-control date-input' min={currentDate} name="fromDate" value={values.fromDate} onChange={handleChange} required/>
      </div>
      <div className="date-form-input">
        <p className="input-label">To:</p>
        <input type="date" data-testid="toDate" className='form-control date-input' min={currentDate} name="toDate" value={values.toDate} onChange={handleChange} required/>
      </div>
    </div>
    <div className="date-form-inputs">
      <div className="date-form-input">
        <p className="input-label">Event:</p>
        <input type="text" data-testid="theEvent" className='form-control' name="theEvent" value={values.theEvent} onChange={handleChange} maxLength={20} placeholder='Enter an event here'/>
      </div>
      <div className="date-form-input">
        <p className="input-label">Location:</p>
        <input type="text" data-testid="location" className='form-control' name="location" value={values.location} onChange={handleChange} maxLength={50} placeholder='Enter event location'/>
      </div>
    </div>
    <div className="date-form-input">
      <p className="input-label">Details:</p>
      <textarea name="details" data-testid="details" className='form-control' value={values.details} onChange={handleChange} rows={5} cols={40} maxLength={50} placeholder='Enter event details here...'/>
    </div>
   </div>
  </div>
 );
}