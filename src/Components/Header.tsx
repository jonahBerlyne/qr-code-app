import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import "../Styles/Header.css";
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Header() {

  const logOut = async (): Promise<any> => {
   try {
     await signOut(auth);
   } catch (err) {
     alert(`Signout error: ${err}`);
   }
  }

  return (
   <Navbar className='header' expand="lg">
     <Container>
       <Navbar.Brand className='header-logo'>QR Code Generator</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto nav-options">
           <Nav.Link className="nav-option" href="/">Home</Nav.Link>
           <Nav.Link className="nav-option" href="/codes">Your QR Codes</Nav.Link>
           <Nav.Link className="nav-option" onClick={logOut}>Logout</Nav.Link>
         </Nav>
       </Navbar.Collapse>
     </Container>
   </Navbar>
  );
}

