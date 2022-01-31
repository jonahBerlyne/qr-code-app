import React, { useState, useEffect } from 'react';

export default function ImagesForm({imgInputChange, imgSrc}) {
 return (
  <div>
   <h4>Upload an image:</h4>
    <input type="file" id="img_input" onChange={imgInputChange}/>
    {imgSrc !== [] && imgSrc.map(img => <img src={imgSrc} alt={imgSrc} height="200px" width="400px"/>)}
  </div>
 );
}