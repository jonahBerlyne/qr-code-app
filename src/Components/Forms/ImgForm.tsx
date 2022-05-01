interface ImgFormInterface {
 choosePic: (e: any) => void;
 imgFile: any;
 imgFileErr: string | null;
};

export default function ImgForm({ choosePic, imgFile, imgFileErr }: ImgFormInterface) {
 return (
  <div>
   <h4>Add an image:</h4>
   <input type="file" name="img" onChange={choosePic} required />
   {imgFileErr && <h6>{imgFileErr}</h6>} 
   {imgFile && <img src={imgFile} alt={imgFile} height="100" width="200"/>}
  </div>
 );
}