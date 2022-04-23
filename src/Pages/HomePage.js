import QR from "../Components/QR";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="App">
      <h1>QR Code App</h1>
      <QR/>
      <Link to="/codes">Your QR Codes</Link>
    </div>
  );
}