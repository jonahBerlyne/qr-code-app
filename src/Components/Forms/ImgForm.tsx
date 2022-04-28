import { FormInterface } from "../QR";

export default function ImgForm({ values, handleChange }: FormInterface) {
 return (
  <div>
   <h4>Add an image:</h4>
   <input type="file" name="img" value={values.img} onChange={handleChange} required />
  </div>
 );
}