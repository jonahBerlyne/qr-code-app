import React from 'react';

export default function EmailForm({onSubmit}) {

 return (
  <div>
   <h4>Enter your e-mail:</h4>
    <form action='mailto: info@example.com' onSubmit={onSubmit}>
     <input type="email" placeholder="Enter your e-mail address" required/>
     <br/>
     <br/>
     <input type="text" placeholder='Enter e-mail subject'/>
     <br/>
     <br/>
     <textarea rows="10" cols="40" placeholder='Enter your message here'/>
     <br/>
     <br/>
     <button type="submit">Generate QR Code</button>
    </form>
  </div>
 );
}