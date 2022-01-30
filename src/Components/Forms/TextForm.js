import React from 'react';

export default function TextForm({textInput, textInputChange}) {
 return (
  <div>
    <h4>Enter a message:</h4>
    <textarea value={textInput} onChange={textInputChange} rows="10" cols="40" placeholder='Enter your message here'/>
  </div>
 );
}