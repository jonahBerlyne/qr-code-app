import React from 'react';

export default function DateForm({fromDateInput, fromDateInputChange, toDateInput, toDateInputChange, eventInput, eventInputChange, locationInput, locationInputChange, detailsInput, detailsInputChange}) {

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
   <input type="date" min={today} value={fromDateInput} onChange={fromDateInputChange} required/>
   <br/>
   <br/>
   <h4>To:</h4>
   <input type="date" min={today} value={toDateInput} onChange={toDateInputChange} required/>
   <br/>
   <br/>
   <h4>Event:</h4>
   <input type="text" value={eventInput} onChange={eventInputChange} placeholder='Enter an event here'/>
   <h4>Location:</h4>
   <input type="text" value={locationInput} onChange={locationInputChange} placeholder='Enter event location'/>
   <h4>Details:</h4>
   <textarea value={detailsInput} onChange={detailsInputChange} rows="10" cols="40" placeholder='Enter event details'/>
  </div>
 );
}