import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  function handleSignOut() {
    // Perform sign-out logic here
    // For example, you can clear user authentication state here
    alert('Sign out successful');
    navigate('/');
  }

  return (
    <div>
      <h1>Welcome User!</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default Welcome;
