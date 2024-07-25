import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user name from local storage
    const name = localStorage.getItem('userName');
    setUserName(name);
  }, []);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      // Perform logout logic here, e.g., clear user data, invalidate session, etc.
      localStorage.removeItem('userName');
      setLoading(false);
      navigate('/login');
    }, 2000); // Simulating a delay for loading effect
  };

  return (
    <div className="header">
      <h1>Welcome, {userName}</h1>
      <button className="logout-button" onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default Header;
