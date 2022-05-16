import "../../Styles/Image.css";

interface ImgFormInterface {
 choosePic: (e: any) => void;
 imgFile: any;
 imgFileErr: string | null;
 imgPreview: any;
};

export default function ImgForm({ choosePic, imgFile, imgFileErr, imgPreview }: ImgFormInterface) {
 return (
  <div className="img-form-container">
   <p className="img-form-header">Add an image:</p>
   <div className="img-input-container">
    <div className="img-input-text">
     <input type="file" name="img" className="form-control img-input" onChange={choosePic} required />
     {imgFileErr && <h6 className="img-file-err">{imgFileErr}</h6>} 
    </div>
    {imgFile ? 
     <img src={imgPreview} alt={imgPreview} className="img-preview" /> : 
     <div className="img-preview">
      <p className="img-preview-text">Choose an image</p>
     </div>
    }
   </div>
  </div>
 );
}