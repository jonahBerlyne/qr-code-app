import React from 'react';

export default function DateForm({fromDateInput, fromDateInputChange, toDateInput, toDateInputChange, eventInput, eventInputChange}) {

 var today = new Date();
 var dd = today.getDate();
 var mm = today.getMonth() + 1; // January is 0
 var yyyy = today.getFullYear();
 var hh = today.getHours();
 var mi = today.getMinutes();

 if (dd < 10) {
    dd = '0' + dd;
 }

 if (mm < 10) {
    mm = '0' + mm;
 } 

 today = yyyy + '-' + mm + '-' + dd + "T" + hh + ":" + mi;

 return (
  <div>
   <h4>Set an event:</h4>
   <input type="datetime-local" min={today} value={fromDateInput} onChange={fromDateInputChange} required/>
   <br/>
   <br/>
   <input type="datetime-local" min={fromDateInput} value={toDateInput} onChange={toDateInputChange} required/>
   <br/>
   <br/>
   <input type="text" value={eventInput} onChange={eventInputChange} placeholder='Enter an event here'/>
  </div>
 );
}