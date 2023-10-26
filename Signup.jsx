import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import './Signup.css';
import { createAuthUserWithEmailAndPassword, createuserdocfromAuth } from './firebase';

function Signup() {
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = contact;

  async function handleClick(event) {
    // Reset errors
    setErrors({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    let hasError = false;

    if (displayName === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        displayName: 'Name is required'
      }));
      hasError = true;
    }

    if (email === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Email is required'
      }));
      hasError = true;
    }

    if (password === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password is required'
      }));
      hasError = true;
    }

    if (confirmPassword === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: 'Confirm Password is required'
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createuserdocfromAuth(user, { displayName });
      console.log(user);
      navigate('/login');
    } catch (error) {
      alert('PLEASE ENTER THE EMAIL AND PASSWORD CORRECTLY');
      console.error('error in creation', error.message);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setContact(prevContact => ({
      ...prevContact,
      [name]: value
    }));
  }

  return (
    <div className="header2">
      <div className="AB">Name:</div>
      <Input
        name='displayName'
        type='text'
        value={displayName}
        onChange={handleInputChange}
      />
      <div className="error" style={{ color: 'red' }}>{errors.displayName}</div>
      <div className="AB">Email:</div>
      <Input
        name='email'
        type='email'
        value={email}
        onChange={handleInputChange}
      />
      <div className="error" style={{ color: 'red' }}>{errors.email}</div>
      <div className="AB">Password:</div>
      <Input
        name='password'
        type='password'
        value={password}
        onChange={handleInputChange}
      />
      <div className="error" style={{ color: 'red' }}>{errors.password}</div>
      <div className="AB">Confirm Password:</div>
      <Input
        name='confirmPassword'
        type='password'
        value={confirmPassword}
        onChange={handleInputChange}
      />
      <div className="error" style={{ color: 'red' }}>{errors.confirmPassword}</div>
      <button onClick={handleClick}>Signup</button>
      <br /><br />
      <Link to='/login'>Login</Link>
    </div>
  );
}

export default Signup;
