import React, { useState, useEffect } from 'react';

export default function ImagesForm({imgInputChange, imgSrc}) {

  // const img_input = document.querySelector("#img_input");
  // let uploaded_img = '';

  // img_input.addEventListener("change",  () => {
  //  const reader = new FileReader();
  //  reader.addEventListener('load', () => {
  //   uploaded_img = reader.result;
  //   document.querySelector("#display_img").style.backgroundImage = `url(${uploaded_img})`;
  //  });
  //  reader.readAsDataURL(this.files[0]);
  // });
 return (
  <div>
    <input type="file" id="img_input" onChange={imgInputChange}/>
    {imgSrc !== [] && imgSrc.map(img => <img src={imgSrc} alt={imgSrc}/>)}
    {/* <div id="display_img"></div> */}
  </div>
 );
}