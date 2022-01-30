import React, { useState, useEffect } from 'react';

export default function ImagesForm({onSubmit}) {
 return (
  <div>
   <form onSubmit={onSubmit}>
    Images Form
   </form>
  </div>
 );
}