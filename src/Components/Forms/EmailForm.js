import React from 'react';

export default function EmailForm({emailAddressChange, emailSubjectChange, emailMsgChange}) {

 return (
  <div>
   <h4>Enter your e-mail:</h4>
     <input type="email" onChange={emailAddressChange} placeholder="Enter your e-mail address" required/>
     <br/>
     <br/>
     <input type="text" onChange={emailSubjectChange} placeholder='Enter e-mail subject'/>
     <br/>
     <br/>
     <textarea onChange={emailMsgChange} rows="10" cols="40" placeholder='Enter your message here'/>
  </div>
 );
}