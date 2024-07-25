import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import avatar from "../../assets/Login/avatar.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const login = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    const loginStartTime = Date.now();

    Axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    }).then((response) => {
      const elapsedTime = Date.now() - loginStartTime;
      const remainingTime = 2000 - elapsedTime;

      setTimeout(() => {
        setLoading(false); // Set loading to false when login completes
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          // Store user data in local storage
          localStorage.setItem('userName', response.data.name); // Assume response.data contains the user's name
          navigate('/home');  // Redirect to Home.jsx
        }
      }, remainingTime > 0 ? remainingTime : 0);
    }).catch((error) => {
      const elapsedTime = Date.now() - loginStartTime;
      const remainingTime = 2000 - elapsedTime;

      setTimeout(() => {
        setLoading(false); // Set loading to false if there's an error
        if (error.response) {
          setLoginStatus(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          setLoginStatus('Network error: Please check your connection.');
        } else {
          setLoginStatus(`Error: ${error.message}`);
        }
      }, remainingTime > 0 ? remainingTime : 0);
    });
  }

  return (
    <div className="login-main">
      <div className="login-sub">
        <h3>Welcome to IYKONS Clicks!</h3>
        <div className="avatar">
          <img src={avatar} alt="Profile Avatar" />
        </div>
        <div className="login-form">
          <div className="login-input-email">
            <input type="email" placeholder="email" className="login-input" onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="login-input-password">
            <input type={passwordVisible ? 'text' : 'password'}  placeholder="Password" className="login-input" onChange={(e) => { setPassword(e.target.value) }} />
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              className="password-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          <button className="login-button" onClick={login} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{loginStatus}</h1>
        </div>
        <div className="signup-option">
          <span>Don't have an account?</span>
          <a href="/signup" className="signup-link">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
