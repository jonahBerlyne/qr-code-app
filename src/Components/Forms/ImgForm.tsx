import React, { useEffect } from "react";
import "../../Styles/Home.css";

interface ImgFormInterface {
 choosePic: (e: any) => void;
 imgFileErr: string | null;
 imgPreview: any;
 setQRValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImgForm({ choosePic, imgFileErr, imgPreview, setQRValue }: ImgFormInterface) {

 useEffect(() => {
  setQRValue(imgPreview);
 }, [imgPreview]);

 return (
  <div data-testid="imgForm" className="img-form">
   <h4 className="img-form-header">Add an image:</h4>
   <div className="img-input-container">
    <img src={imgPreview} alt={imgPreview} className="img-preview" /> 
    {imgFileErr && <h6 data-testid="imgFileErr" className="img-file-err">{imgFileErr}</h6>}
    <div className="img-input">     
     <p className="img-preview-text">Choose an image</p>
     <input type="file" data-testid="imgInput" name="img" className="form-control" onChange={choosePic} required />
    </div> 
   </div>
  </div>
 );
}