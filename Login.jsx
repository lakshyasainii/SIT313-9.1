import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "./Input";
import { signinAuthUserWithEmailAndPassword } from "./firebase";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    email: "",
    password: "",
  });

  const { email, password } = contact;

  async function handleClick(event) {
    try {
      if (!email || !password) {
        alert('Please enter your email and password or sign up.');
        return;
      }

      const response = await signinAuthUserWithEmailAndPassword(email, password);

      if (!response) {
        alert('Invalid email or password.');
        return;
      }

      alert('Login Successful');
      navigate('/welcome');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  function handlePass(event) {
    const { name, value } = event.target;

    setContact((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  }

  return (
    <div className="signupheader">
      <Link to='/signup' className="Link">
        Sign up
      </Link>

      <div className="Emailheader"><h2>Your E-mail</h2></div>
      <Input
        name='email'
        type='email'
        onChange={handlePass}
      />
      <br></br>

      <div className="Emailheader"><h2>Your Password</h2></div>
      <Input
        name='password'
        type='password'
        onChange={handlePass}
      />
      <br></br>

      <button className="loginheader" onClick={handleClick}>
        Login
      </button>

      <br></br>
    </div>
  )
}

export default Login;
