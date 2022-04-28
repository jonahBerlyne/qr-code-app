import { FormInterface } from "../QR";

export default function ContactForm({ values, handleChange }: FormInterface) {
 return (
  <div>
   <h4>Fill in contact form:</h4>
   <h4>First Name:</h4>
   <input type="text" name="firstName" value={values.firstName} onChange={handleChange} placeholder='First name' required/>
   <h4>Last Name:</h4>
   <input type="text" name="lastName" value={values.lastName} onChange={handleChange} placeholder='Last name' required/>
   <h4>Phone Number:</h4>
   <input type="text" name="phone" value={values.phone} onChange={handleChange} placeholder='Phone' required/>
   <h4>E-mail Address:</h4>
   <input type="text" name="email" value={values.email} onChange={handleChange} placeholder='E-mail Address' required/>
   <h4>Address:</h4>
   <input type="text" name="address" value={values.address} onChange={handleChange} placeholder='Address' required/>
   <h4>City:</h4>
   <input type="text" name="city" value={values.city} onChange={handleChange} placeholder='City' required/>
   <h4>State/Province:</h4>
   <input type="text" name="stateProvince" value={values.stateProvince} onChange={handleChange} placeholder='State' required/>
   <h4>Zip/Postal Code:</h4>
   <input type="text" name="zipPostal" value={values.zipPostal} onChange={handleChange} placeholder='Zip/Postal Code' required/>
   <h4>Country:</h4>
   <input type="text" name="country" value={values.country} onChange={handleChange} placeholder='Country' required/>
   <h4>Website:</h4>
   <input type="text" name="url" value={values.url} onChange={handleChange} placeholder='Website' required/>
  </div>
 );
}