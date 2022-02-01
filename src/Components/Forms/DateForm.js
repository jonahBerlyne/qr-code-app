import React from 'react';

export default function DateForm({ values, handleChange }) {

 var today = new Date();
 var dd = today.getDate();
 var mm = today.getMonth() + 1; // January is 0
 var yyyy = today.getFullYear();

 if (dd < 10) {
    dd = '0' + dd;
 }

 if (mm < 10) {
    mm = '0' + mm;
 } 

 today = yyyy + '-' + mm + '-' + dd;

 return (
  <div>
   <h4>Set an event:</h4>
   <h4>From:</h4>
   <input type="date" min={today} name="fromDate" value={values.fromDate} onChange={handleChange} required/>
   <br/>
   <br/>
   <h4>To:</h4>
   <input type="date" min={today} name="toDate" value={values.toDate} onChange={handleChange} required/>
   <br/>
   <br/>
   <h4>Event:</h4>
   <input type="text" name="theEvent" value={values.theEvent} onChange={handleChange} placeholder='Enter an event here'/>
   <h4>Location:</h4>
   <input type="text" name="location" value={values.location} onChange={handleChange} placeholder='Enter event location'/>
   <h4>Details:</h4>
   <textarea name="details" value={values.details} onChange={handleChange} rows="10" cols="40" placeholder='Enter event details'/>
  </div>
 );
}