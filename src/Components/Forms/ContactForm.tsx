import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Contact.css";

export default function ContactForm({ values, handleChange }: FormInterface) {
 return (
  <div className="contact-form">
   <h4 className="contact-form-header">Fill in contact form:</h4>
   <div className="contact-inputs-container">
     <div className="contact-inputs-row">
      <div className="contact-form-input">
        <h4 className="input-label">First Name:</h4>
        <input type="text" className="form-control contact-input" name="firstName" value={values.firstName} onChange={handleChange} placeholder='First Name' required/>
      </div>
      <div className="contact-form-input">
        <h4 className="input-label">Last Name:</h4>
        <input type="text" className="form-control contact-input" name="lastName" value={values.lastName} onChange={handleChange} placeholder='Last Name' required/>
      </div>
        <div className="contact-form-input">
        <h4 className="input-label">Phone Number:</h4>
        <input type="text" className="form-control contact-input" name="phone" value={values.phone} onChange={handleChange} placeholder='Phone Number' required/>
      </div>
     </div>
     <div className="contact-inputs-row">
      <div className="contact-form-input">
        <h4 className="input-label">E-mail Address:</h4>
        <input type="text" className="form-control contact-input" name="email" value={values.email} onChange={handleChange} placeholder='E-mail Address' required/>
      </div>
      <div className="contact-form-input">
        <h4 className="input-label">Address:</h4>
        <input type="text" className="form-control contact-input" name="address" value={values.address} onChange={handleChange} placeholder='Address' required/>
      </div>
      <div className="contact-form-input">
        <h4 className="input-label">City:</h4>
        <input type="text" className="form-control contact-input" name="city" value={values.city} onChange={handleChange} placeholder='City' required/>
      </div>
     </div>
     <div className="contact-inputs-row">
      <div className="contact-form-input">
        <h4 className="input-label">State/Province:</h4>
        <input type="text" className="form-control contact-input" name="stateProvince" value={values.stateProvince} onChange={handleChange} placeholder='State/Province' required/>
      </div>
      <div className="contact-form-input">
        <h4 className="input-label">Zip/Postal Code:</h4>
        <input type="text" className="form-control contact-input" name="zipPostal" value={values.zipPostal} onChange={handleChange} placeholder='Zip/Postal Code' required/>
      </div>
      <div className="contact-form-input">
        <h4 className="input-label">Country:</h4>
        <input type="text" className="form-control contact-input" name="country" value={values.country} onChange={handleChange} placeholder='Country' required/>
      </div>
     </div>
   </div>
  </div>
 );
}