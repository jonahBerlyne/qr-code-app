import React from 'react';

export default function TextForm({ values, handleChange }) {
 return (
  <div>
    <h4>Enter a message:</h4>
    <textarea name="searchMsg" value={values.searchMsg} onChange={handleChange} rows="10" cols="40" placeholder='Enter your message here'/>
  </div>
 );
}