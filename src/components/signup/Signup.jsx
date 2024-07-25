import React, { useState } from "react";
import Axios from "axios";
import './Signup.css';
import Avatar from '../../assets/Login/avatar.png';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const isStrongPassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const isIykonsEmail = (email) => {
    return email.endsWith("@iykons.com");
  };

  const register = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setRegisterStatus("Passwords do not match");
      return;
    }

    if (!isStrongPassword(password)) {
      setRegisterStatus("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.");
      return;
    }

    if (!isIykonsEmail(email)) {
      setRegisterStatus("Please use your iykons email address (e.g., yourname@iykons.com)");
      return;
    }

    Axios.post("http://localhost:5000/register", {
      email: email,
      name: name,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    }).catch((error) => {
      if (error.response) {
        setRegisterStatus(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        setRegisterStatus('Network error: Please check your connection.');
      } else {
        setRegisterStatus(`Error: ${error.message}`);
      }
    });
  };

  return (
    <div className="signup-main">
      <div className="signup-sub">
        <img src={Avatar} alt="Profile Avatar" className="avatar" />
        <input type="text" placeholder="Name" className="signup-input-field" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="signup-input-field" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="signup-input-field" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" className="signup-input-field" onChange={(e) => setConfirmPassword(e.target.value)} />
        <button className="signup-button" onClick={register}>Sign Up</button>
        <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
        <div className="signup-option">
          <span>Already have an account?</span>
          <a href="/login" className="signup-link">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
