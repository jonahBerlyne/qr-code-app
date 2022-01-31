import React, { useState, useEffect } from 'react';
import store from "../../Redux/Store";
import { Link } from 'react-router-dom';
import { deleteQRCode } from '../../Redux/Actions';
import ContactCodes from './ContactCodes';
import DateCodes from './DateCodes';
import EmailCodes from './EmailCodes';
import TextCodes from './TextCodes';
import UrlCodes from './UrlCodes';

export default function Codes() {
 const [state, setState] = useState([]);

 useEffect(() => {
  setState(store.getState());
 });

 const [refresh, setRefresh] = useState(false);

 const deleteItem = id => {
  store.dispatch(deleteQRCode(id));
  setRefresh(!refresh);
 }

 return (
  <div>
   <h1>Your QR Codes:</h1>
   <ContactCodes state={state} deleteItem={deleteItem}/>
   <DateCodes state={state} deleteItem={deleteItem}/>
   <EmailCodes state={state} deleteItem={deleteItem}/>
   <TextCodes state={state} deleteItem={deleteItem}/>
   <UrlCodes state={state} deleteItem={deleteItem}/>
   <br/>
   <Link to="/">Home</Link>
  </div>
 );
}