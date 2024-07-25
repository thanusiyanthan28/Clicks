import React from 'react';
import './Home.css';
import Header from '../header/Header';

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="content">
        <h2>Welcome to the Home Page</h2>
        <p>This is a protected page that requires login.</p>
      </div>
    </div>
  );
}

export default Home;
