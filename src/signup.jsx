// signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import dog6 from './assets/images/dog6.png';

export default function Signup() {
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="overlay" />
        <img src={dog6} alt="Pawfive promo" />
        <div className="left-content">
          <h1>All you need is one Swipe!</h1>
          <p>To meet your best friend</p>
        </div>
      </div>
      <div className="signup-right">
        <h2>Welcome, Please make an Account!</h2>
        <p className="sub">Meet your Best Friend Today!</p>
        <form className="form" onSubmit={e => { e.preventDefault(); navigate('/chatbot'); }}>
          <label>E-mail or phone number</label>
          <input type="text" placeholder="Type your e-mail or phone number" />

          <label>Password</label>
          <div className="pw-wrapper">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Type your password"
            />
            <button
              type="button"
              className="toggle"
              onClick={() => setShowPw(!showPw)}
            >
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>

          <Link to="#" className="forgot">
            Forgot Password?
          </Link>

          <button type="submit" className="btn-signin">
            Sign Up!
          </button>
        </form>

        <div className="alt">
          <span className="line" />
          <span>or do it via other accounts</span>
          <span className="line" />
        </div>

        <div className="social">
          <button className="icon google">G</button>
          <button className="icon apple"></button>
          <button className="icon facebook">f</button>
        </div>

        <p className="no-account">
          Already have an account? <Link to="/Signin">Login</Link>
        </p>
      </div>
    </div>
  );
}
