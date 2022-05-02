interface ImgFormInterface {
 choosePic: (e: any) => void;
 imgFile: any;
 imgFileErr: string | null;
 imgPreview: any;
};

export default function ImgForm({ choosePic, imgFile, imgFileErr, imgPreview }: ImgFormInterface) {
 return (
  <div>
   <h4>Add an image:</h4>
   <input type="file" name="img" onChange={choosePic} required />
   {imgFileErr && <h6>{imgFileErr}</h6>} 
   {imgFile && <img src={imgPreview} alt={imgPreview} height="100" width="200"/>}
  </div>
 );
}