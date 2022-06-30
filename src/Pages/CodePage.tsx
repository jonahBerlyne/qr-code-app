import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { QRCodeCanvas } from 'qrcode.react';
import { doc, getDoc } from 'firebase/firestore';
import fireDB from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import "../Styles/Codes.css";

export default function CodePage() {

  const codeParam = useParams();

  const [codeInfo, setCodeInfo] = useState<any>({});
  const [codeRetrieved, setCodeRetrieved] = useState<boolean>(false);
  const [codeType, setCodeType] = useState<string | null>(null);
  const [qrValue, setQRValue] = useState<string>("");

  const navigate = useNavigate();

  const retrieveQRCode = async (): Promise<any> => {
    try {
      const docRef = doc(fireDB, "users", `${getAuth().currentUser?.uid}`, "codes", `${codeParam.id}`);
      const codeDoc = await getDoc(docRef);
      if (codeDoc.data()?.info) setCodeInfo(codeDoc.data()?.info);
      setCodeType(codeDoc.data()?.type);
      setQRValue(codeDoc.data()?.value);
    } catch (err) {
      alert(`QR code retrieval error: ${err}`);
      navigate("/");
    }
  }
  
  useEffect(() => {
    if (qrValue === "") retrieveQRCode();
    if (qrValue !== "") setCodeRetrieved(true);
    return () => {
      setCodeRetrieved(false);
    }
  }, [qrValue]);

  return (
    <div className='code-page-container'>
      <Header />
      {codeRetrieved &&
        <div className='saved-qr-code-container'>
          {codeType === "contact" && 
            <h4 data-testid="contactHeader" className='saved-qr-code-header'>
              Contact card for {codeInfo.first} {codeInfo.last}:
            </h4>
          } 
          {codeType === "date" && 
            <h4 data-testid="dateHeader" className='saved-qr-code-header'>
              Code for {codeInfo.event}:
            </h4>
          } 
          {codeType === "email" && 
            <>
              <h4 data-testid="emailCodeAddress" className='email-code-header'>Email to {codeInfo.to}</h4>
              <p data-testid="emailCodeSubj" className='email-subj-text'>
                <span>Subject:</span>
                <span>{codeInfo.subj}</span>
              </p>
            </>
          } 
          {codeType === "img" && 
            <>            
              <h4 data-testid="imgHeader" className='saved-qr-code-header'>
                Image of:
              </h4>
              <h4 data-testid="imgName" className='saved-qr-code-header'>
                {codeInfo.name}
              </h4>
            </>
          } 
          {codeType === "search" && 
            <h4 data-testid="searchHeader" className='saved-qr-code-header'>
              {qrValue}
            </h4>
          } 
          {codeType === "url" && 
            <h4 className='saved-url-code-header'>
              <a data-testid="urlCodeLink" href={qrValue} target="_blank" rel="noreferrer" className="saved-url-text">{qrValue}</a>
            </h4>
          } 
          <QRCodeCanvas size={200} value={qrValue} />
        </div>
      }
    </div>
  );
}