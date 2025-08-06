// LandingP.jsx
import React, { useState } from 'react';
import './landingp.css';
import logo from './assets/images/logo.png';
import dog1 from './assets/images/dog1.jpeg';
import dog2 from './assets/images/dog2.jpeg';
import dog3 from './assets/images/dog3.png';
import dog4 from './assets/images/dog4.png';
import { Link } from 'react-router-dom';

export default function Landingp() {
  const images = [dog1, dog2, dog3, dog4];
  const [current, setCurrent] = useState(0);
  const prevImage = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const nextImage = () => setCurrent((current + 1) % images.length);

  return (
    <div className="lp">
      <nav className="lp-nav">
        <img src={logo} alt="Pawfive" className="lp-logo" />
        <ul className="lp-nav-links">
          {['Product', 'Company', 'Resources', 'Plans'].map((t) => (
            <li key={t}>
              {t} <span className="caret">▾</span>
            </li>
          ))}
        </ul>
        <div className="lp-nav-right">
          <Link to="/signin" className="btn-login">Login</Link>
          <Link to="/signup" className="btn-signup">Signup</Link>
        </div>
      </nav>

      <main className="lp-main">
        {/* Hero */}
        <div className="lp-header">
  <div className="lp-hero-inner">
    <h1>
      Animal Adoption<br />
      <span className="highlight">Made Easy</span>
    </h1>
    <div className="lp-sub">
      <span className="lp-sub-line">
        Just say "find me a chubby pug," and Pawfive will whisk up a swipe-tastic gallery of adoptable pups near you
      </span>
      <span className="lp-sub-line">
        Spot your favorite? Swipe up to give the go-ahead, and we'll handle the rest!
      </span>
    </div>
  </div>
</div>

        {/* Content */}
        <div className="lp-content">
          <div className="lp-copy">
            <h2>Swipe.</h2>
            <h2>Explore.</h2>
            <h2>Apply.</h2>
            <div className="lp-actions">
              {/* <Link to="/signup" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Signup</Link> */}
            </div>
            {/* moved Login/Signup pills here */}
            <div className="lp-footer-links">
              <Link to="/signin" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Signup</Link>
            </div>
          </div>

          <div className="lp-carousel">
            <button className="carousel-arrow left" onClick={prevImage}>‹</button>
            {images.map((src, i) => {
              const idx = (i - current + images.length) % images.length;
              if (idx >= 4) return null;
              return (
                <div
                  key={i}
                  className="card"
                  style={{
                    backgroundImage: `url(${src})`,
                    transform: `translateX(${idx * 80}px)`,
                    zIndex: 4 - idx,
                  }}
                />
              );
            })}
            <button className="carousel-arrow right" onClick={nextImage}>›</button>
          </div>
        </div>

      </main>
    </div>
  );
}
