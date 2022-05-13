import React from 'react';
import QRCode from 'qrcode.react';
import { doc, deleteDoc } from "firebase/firestore";
import fireDB from '../firebaseConfig';

interface QRInterface {
  card?: string;
  codeType: string;
  collection: string;
  color: string;
  details?: string;
  email?: string;
  event?: string;
  first?: string;
  from?: string;
  id: any;
  img?: string;
  last?: string;
  location?: string;
  msg?: string;
  name?: string;
  subj?: string;
  text?: string;
  title?: string;
  to?: string;
  url?: string;
  value: string;
};

export default function QR(props: QRInterface) {
  const {
    card,
    codeType, 
    collection, 
    color, 
    details, 
    email, 
    event,
    first,
    from,
    id,
    img,
    last,
    location,
    msg,
    name,
    subj,
    text,
    title,
    to,
    url,
    value 
  } = props;

  const deleteItem = async (code_collection: any, id: any): Promise<any> => {
    try {
      await deleteDoc(doc(fireDB, code_collection, id));
    } catch (err) {
      alert(`Deletion error: ${err}`);
    }
  }

  return (
    <div key={id} className="qr-code" style={{ borderColor: `${color}` }}>
      <br/>
      <br/>
      <QRCode value={value} />
      <br/>
      <br/>
      <button onClick={() => deleteItem(collection, id)}>Delete QR Code</button>
      <br/>
      <br/>
    </div>
  );
}