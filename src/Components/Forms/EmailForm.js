import React from 'react';

export default function EmailForm({emailAddress, emailAddressChange, emailSubject, emailSubjectChange, emailMsg, emailMsgChange}) {

 return (
  <div>
   <h4>Send an e-mail:</h4>
     <input type="email" value={emailAddress} onChange={emailAddressChange} placeholder="Enter e-mail address" required/>
     <br/>
     <br/>
     <input type="text" value={emailSubject} onChange={emailSubjectChange} placeholder='Enter e-mail subject'/>
     <br/>
     <br/>
     <textarea value={emailMsg} onChange={emailMsgChange} rows="10" cols="40" placeholder='Enter your message here'/>
  </div>
 );
}