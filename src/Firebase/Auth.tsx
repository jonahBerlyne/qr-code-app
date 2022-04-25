import { useRef, useState } from "react";
import { signUp, logIn, useAuth, logOut } from "./Firebase";

export default function Auth() {

  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignUp() {
    setLoading(true);
    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      alert(`Sign up error: ${err}`);
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      alert(`Login error: ${err}`);
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logOut();
    } catch (err) {
      alert(`Logout error: ${err}`);
    }
    setLoading(false);
  }

  return (
    <div className="auth">

      <div>Currently logged in as: {currentUser?.email}</div>

      {!currentUser && 
        <>
          <div className="field">
            <input ref={emailRef} type="email" className="auth-input" placeholder="email" required/>
            <input ref={passwordRef} type="password" className="auth-input" placeholder="password" required/>
          </div>
          <button disabled={ loading } className="auth-btn" onClick={handleSignUp}>Sign Up</button>
          <button disabled={ loading } className="auth-btn" onClick={handleLogin}>Login</button>
        </>
      }



      {currentUser && 
        <>
          <button disabled={ loading } className="auth-btn" onClick={handleLogout}>Log Out</button>
        </>
      }
    </div>
  );
}