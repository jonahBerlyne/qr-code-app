import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { doc, deleteDoc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import "../Styles/QR.css";

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
          <p className='qr-text'>Contact card for {first} {last}:</p>
        </div>
      }
      {codeType === "date" && 
        <div className='qr-code-header'>
          <p className='qr-text'>Code for {event}</p>
        </div>
      }
      {codeType === "email" && 
        <div className='qr-code-header'>
          <p className='qr-text'>Email to {to}</p>
          <p className='qr-text'>Subject:</p>
          <p className="qr-text">{subj}</p>
        </div>
      }
      {codeType === "img" && 
        <div className='qr-code-header'>
          <p className='qr-text'>Image of:</p>
          <p className='qr-text'>{name}</p>
        </div>
      }
      {codeType === "search" && 
        <div className='qr-code-header'>
          <p className="qr-text">{text}</p>
        </div>
      }
      {codeType === "url" && 
        <div className='url-text-header'>
          <a href={url} target="_blank" rel="noreferrer" className="url-text">{url}</a>
        </div>
      }
      <div className='qr-code-container'>
        <QRCode value={value} />
      </div>
      {showDeleteBtn && <button onClick={() => deleteItem(codeCollection, id)}>Delete QR Code</button>}
    </div>
  );
}