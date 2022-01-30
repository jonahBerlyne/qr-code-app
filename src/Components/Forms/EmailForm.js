import React, { useState, useEffect } from 'react';

export default function EmailForm({onSubmit}) {
 return (
  <div>
   <form onSubmit={onSubmit}>
    Email Form
   </form>
  </div>
 );
}