import { FormInterface } from "../../Pages/HomePage";
import "../../Styles/Contact.css";

export default function ContactForm({ values, handleChange }: FormInterface) {
 return (
  <div data-testid="contactForm" className="contact-form">
   <h4 className="contact-form-header">Create a contact:</h4>
   <div className="contact-inputs-container">
     <div className="contact-inputs-row">
      <div className="contact-form-input">
        <p className="input-label">First Name:</p>
        <input type="text" data-testid="firstName" className="form-control contact-input" name="firstName" value={values.firstName} onChange={handleChange} placeholder='First Name' maxLength={20} required/>
      </div>
      <div className="contact-form-input">
        <p className="input-label">Last Name:</p>
        <input type="text" data-testid="lastName" className="form-control contact-input" name="lastName" value={values.lastName} onChange={handleChange} maxLength={20} placeholder='Last Name' required/>
      </div>
        <div className="contact-form-input">
        <p className="input-label">Phone Number:</p>
        <input type="text" data-testid="phone" className="form-control contact-input" name="phone" value={values.phone} onChange={handleChange} maxLength={50} placeholder='Phone Number' required/>
      </div>
     </div>
     <div className="contact-inputs-row">
      <div className="contact-form-input">
        <p className="input-label">E-mail Address:</p>
        <input type="text" data-testid="email" className="form-control contact-input" name="email" value={values.email} onChange={handleChange} maxLength={50} placeholder='E-mail Address' required/>
      </div>
      <div className="contact-form-input">
        <p className="input-label">Address:</p>
        <input type="text" data-testid="address" className="form-control contact-input" name="address" value={values.address} onChange={handleChange} maxLength={50} placeholder='Address' required/>
      </div>
      <div className="contact-form-input">
        <p className="input-label">City:</p>
        <input type="text" data-testid="city" className="form-control contact-input" name="city" value={values.city} onChange={handleChange} maxLength={50} placeholder='City' required/>
      </div>
     </div>
     <div className="contact-inputs-row">
      <div className="contact-form-input">
        <p className="input-label">State/Province:</p>
        <input type="text" data-testid="stateProvince" className="form-control contact-input" name="stateProvince" value={values.stateProvince} onChange={handleChange} placeholder='State/Province' maxLength={50} required/>
      </div>
      <div className="contact-form-input">
        <p className="input-label">Zip/Postal Code:</p>
        <input type="text" data-testid="zipPostal" className="form-control contact-input" name="zipPostal" value={values.zipPostal} onChange={handleChange} placeholder='Zip/Postal Code' maxLength={50} required/>
      </div>
      <div className="contact-form-input">
        <p className="input-label">Country:</p>
        <input type="text" data-testid="country" className="form-control contact-input" name="country" value={values.country} onChange={handleChange} placeholder='Country' maxLength={50} required/>
      </div>
     </div>
   </div>
  </div>
 );
}