export default function ContactForm({ firstInput, firstInputChange, lastInput, lastInputChange, phoneInput, phoneInputChange, emailAddress, emailAddressChange, streetInput, streetInputChange, cityInput, cityInputChange, stateInput, stateInputChange, zipInput, zipInputChange, countryInput, countryInputChange, urlInput, urlInputChange }) {
 return (
  <div>
   <h4>Fill in contact form:</h4>
   <h4>First Name:</h4>
   <input type="text" value={firstInput} onChange={firstInputChange} placeholder='First name' required/>
   <h4>Last Name:</h4>
   <input type="text" value={lastInput} onChange={lastInputChange} placeholder='Last name' required/>
   <h4>Phone Number:</h4>
   <input type="text" value={phoneInput} onChange={phoneInputChange} placeholder='Phone' required/>
   <h4>E-mail Address:</h4>
   <input type="text" value={emailAddress} onChange={emailAddressChange} placeholder='E-mail Address' required/>
   <h4>Address:</h4>
   <input type="text" value={streetInput} onChange={streetInputChange} placeholder='Address' required/>
   <h4>City:</h4>
   <input type="text" value={cityInput} onChange={cityInputChange} placeholder='City' required/>
   <h4>State/Province:</h4>
   <input type="text" value={stateInput} onChange={stateInputChange} placeholder='State' required/>
   <h4>Zip/Postal Code:</h4>
   <input type="text" value={zipInput} onChange={zipInputChange} placeholder='Zip/Postal Code' required/>
   <h4>Country:</h4>
   <input type="text" value={countryInput} onChange={countryInputChange} placeholder='Country' required/>
   <h4>Website:</h4>
   <input type="text" value={urlInput} onChange={urlInputChange} placeholder='Website' required/>
  </div>
 );
}