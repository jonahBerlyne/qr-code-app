import React, { useState, useEffect } from 'react';
import store from "../../Redux/Store";
import { Link } from 'react-router-dom';
import { deleteQRCode } from '../../Redux/Actions';
import db from '../../Firebase';
import { doc, deleteDoc } from "firebase/firestore";
import ContactCodes from './ContactCodes';
import DateCodes from './DateCodes';
import EmailCodes from './EmailCodes';
import ImageCodes from "./ImageCodes";
import TextCodes from './TextCodes';
import UrlCodes from './UrlCodes';

export default function Codes() {
 const [state, setState] = useState<any[]>([]);

 useEffect(() => {
  setState(store.getState());
 });

 const [refresh, setRefresh] = useState<boolean>(false);

 const deleteItem = async (code_collection: any, id: any): Promise<any> => {
  store.dispatch(deleteQRCode(id));
  try {
   await deleteDoc(doc(db, code_collection, id));
  } catch (error) {
   alert(error);
  }
  setRefresh(!refresh);
 }

 return (
  <div>
   <h1>Your QR Codes:</h1>
   <ContactCodes state={state} deleteItem={deleteItem}/>
   <DateCodes state={state} deleteItem={deleteItem}/>
   <EmailCodes state={state} deleteItem={deleteItem}/>
   <ImageCodes state={state} deleteItem={deleteItem}/>
   <TextCodes state={state} deleteItem={deleteItem}/>
   <UrlCodes state={state} deleteItem={deleteItem}/>
   <br/>
   <Link to="/">Home</Link>
  </div>
 );
}

export interface CodeInterface {
 state: any;
 deleteItem: (code_collection: any, id: any) => Promise<any>;
};