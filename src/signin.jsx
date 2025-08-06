import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';
import dog6 from './assets/images/dog6.png';

export default function Signin() {
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="signin-container">
      <div className="signin-left">
        <div className="overlay" />
        <img src={dog6} alt="Pawfive promo" />
        <div className="left-content">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue your journey</p>
        </div>
      </div>
      <div className="signin-right">
        <h2>Sign In to Your Account</h2>
        <p className="sub">We're happy to see you again!</p>
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
            Sign In
          </button>
        </form>

        <div className="alt">
          <span className="line" />
          <span>or sign in via other accounts</span>
          <span className="line" />
        </div>

        <div className="social">
          <button className="icon google">G</button>
          <button className="icon apple"></button>
          <button className="icon facebook">f</button>
        </div>

        <p className="no-account">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
} 