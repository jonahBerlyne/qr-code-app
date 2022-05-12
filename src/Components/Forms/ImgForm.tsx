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
    <input type="file" name="img" className="img-input" onChange={choosePic} required />
    {imgFileErr && <h6>{imgFileErr}</h6>} 
    {imgFile && <img src={imgPreview} alt={imgPreview} className="img-preview" />}
   </div>
  </div>
 );
}