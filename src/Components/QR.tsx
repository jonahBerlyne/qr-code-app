import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { doc, deleteDoc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';

interface QRInterface {
  codeCollection: string;
  codeType: string;
  color: string;
  id: any;
  showDeleteBtn: boolean;
  timestamp: any;
  value: string;
  event?: string;
  first?: string;
  last?: string;
  name?: string;
  subj?: string;
  text?: string;
  to?: string;
  url?: string;
};

export default function QR(props: QRInterface) {
  const {
    codeCollection,
    codeType,
    color,
    id,
    showDeleteBtn,
    timestamp,
    value,
    event,
    first,
    last,
    name,
    subj,
    text,
    to,
    url
  } = props;

  const deleteItem = async (code_collection: any, id: any): Promise<any> => {
    try {
      await deleteDoc(doc(fireDB, "users", `${auth.currentUser?.uid}`, code_collection, id));
    } catch (err) {
      alert(`Deletion error: ${err}`);
    }
  }

  return (
    <div className="qr-code" style={{ borderColor: `${color}` }}>
      {codeType === "contact" && 
        <div className='qr-code-header'>
          <p>Contact card for {first} {last}:</p>
        </div>
      }
      {codeType === "date" && 
        <div className='qr-code-header'>
          <p>Code for {event}</p>
        </div>
      }
      {codeType === "email" && 
        <div className='qr-code-header'>
          <p className='qr-code-of'>Email to {to}</p>
          <p className='qr-code-of'>Subject:</p>
          <p>{subj}</p>
        </div>
      }
      {codeType === "img" && 
        <div className='qr-code-header'>
          <p className='qr-code-of'>Image of:</p>
          <p>{name}</p>
        </div>
      }
      {codeType === "search" && 
        <div className='qr-code-header'>
          <p>{text}</p>
        </div>
      }
      {codeType === "url" && 
        <div className='qr-code-header'>
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
        </div>
      }
      <div className='qr-code-container'>
        <QRCode value={value} />
      </div>
      {showDeleteBtn && <button onClick={() => deleteItem(codeCollection, id)}>Delete QR Code</button>}
    </div>
  );
}