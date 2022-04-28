import React, { useState, useEffect } from 'react';
import { FormInterface } from "../QR";

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
  <div>
   <h4>Set an event:</h4>
   <h4>From:</h4>
   <input type="date" min={currentDate} name="fromDate" value={values.fromDate} onChange={handleChange} required/>
   <br/>
   <br/>
   <h4>To:</h4>
   <input type="date" min={currentDate} name="toDate" value={values.toDate} onChange={handleChange} required/>
   <br/>
   <br/>
   <h4>Event:</h4>
   <input type="text" name="theEvent" value={values.theEvent} onChange={handleChange} placeholder='Enter an event here'/>
   <h4>Location:</h4>
   <input type="text" name="location" value={values.location} onChange={handleChange} placeholder='Enter event location'/>
   <h4>Details:</h4>
   <textarea name="details" value={values.details} onChange={handleChange} rows={10} cols={40} placeholder='Enter event details'/>
  </div>
 );
}