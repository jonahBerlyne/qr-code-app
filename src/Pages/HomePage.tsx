import QR from "../Components/QR";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function HomePage() {

  const auth = getAuth();

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert(`Signout error: ${err}`);
    }
  }
  
  return (
    <div className="App">
      <h1>QR Code App</h1>
      <QR/>
      <Link to="/codes">Your QR Codes</Link>
      <button onClick={logOut}>Sign Out</button>
    </div>
  );
}