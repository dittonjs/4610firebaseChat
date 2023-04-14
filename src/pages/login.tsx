import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user);
      })
  }


  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user)
      })
  }

  return (
    <div className="container">
      <div className="login">
        <div>Login / Create Account</div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
        <div className="login-controls">
          <button className="secondary" onClick={signUp}>Create Account</button>
          <button onClick={login}>Sign In</button>
        </div>
      </div>
    </div>
  )
}