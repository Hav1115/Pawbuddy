// src/components/DogGallery.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './dogGallery.css';

export default function DogGallery() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const animals = state?.animals || [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // when you switch dogs, jump back to top so the photo shows first
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [index]);

  if (!animals.length) {
    return (
      <div className="dg-page">
        <header className="dg-header">
          <button className="dg-back" onClick={() => navigate(-1)}>← Back</button>
          <h2>Dog Gallery</h2>
        </header>
        <p className="dg-empty">No listings to display.</p>
      </div>
    );
  }

  const handlers = useSwipeable({
    onSwipedLeft:  () => setIndex(i => Math.min(animals.length - 1, i + 1)),
    onSwipedRight: () => setIndex(i => Math.max(0, i - 1)),
    trackMouse: true,
  });

  const cur = animals[index];
  const photo =
    cur.photo ||
    cur.photos?.[0]?.medium ||
    'https://via.placeholder.com/1200x900?text=No+Photo';

  const captionBits = [
    cur.breed || cur.breeds?.primary,
    [cur.age, cur.gender].filter(Boolean).join(' • '),
    cur.location
  ].filter(Boolean);

  return (
    <div className="dg-page">
      <header className="dg-header">
        <button className="dg-back" onClick={() => navigate(-1)}>← Back</button>
        <h2>Dog Gallery</h2>
      </header>

      {/* PHOTO FIRST */}
      <section className="dg-photo-wrap" {...handlers}>
        <img className="dg-photo" src={photo} alt={cur.name || `dog-${index}`} />
        <button
          className="dg-nav dg-left"
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="dg-nav dg-right"
          onClick={() => setIndex(i => Math.min(animals.length - 1, i + 1))}
          disabled={index === animals.length - 1}
          aria-label="Next"
        >
          ›
        </button>
        <span className="dg-counter">{index + 1}/{animals.length}</span>
      </section>

      {/* INFO BELOW (scroll to see) */}
      <section className="dg-info">
        <h1 className="dg-name">{cur.name}</h1>

        <div className="dg-tags">
          {captionBits.map((t, i) => (
            <span key={i} className="dg-tag">{t}</span>
          ))}
        </div>

        <div className="dg-actions">
          <button className="dg-btn" onClick={() => navigate(-1)}>Back to search</button>
          {cur.url ? (
            <a className="dg-btn dg-primary" href={cur.url} target="_blank" rel="noreferrer">
              View on Petfinder ↗
            </a>
          ) : (
            <button className="dg-btn" disabled>View on Petfinder</button>
          )}
        </div>
      </section>
    </div>
  );
}
