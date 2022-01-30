import React, { useState, useEffect } from 'react';

export default function TextForm({onSubmit}) {
 return (
  <div>
   <form onSubmit={onSubmit}>
    Text Form
   </form>
  </div>
 );
}