// src/components/Chatbot.jsx
import React, { useState } from 'react';
import './chatbot.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001';
const SPECIES_MAP = { Dog: 'dog', Cat: 'cat', Other: 'dog' }; // "other" -> default dog for now
const AGE_MAP = { Any: '', 'Puppy/Kitten': 'puppy', Adult: 'adult', Senior: 'senior' };

export default function Chatbot() {
  const navigate = useNavigate();

  // filter state
  const [species, setSpecies] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('Any');

  // chat state
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Type whatever you're looking for." }
  ]);

  // holds what we’ll pass to DogGallery
  const [lastAnimals, setLastAnimals] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !breed && age === 'Any') return;

    setMessages(prev => [...prev, { sender: 'user', text: inputText || '(search)' }]);
    setLoading(true);
    setError(null);
    setGalleryImages([]);
    setLastAnimals([]);

    // Build a parser-friendly message (the backend only reads `message`)
    const parts = [
      'find',
      AGE_MAP[age],
      (breed || '').toLowerCase(),
      SPECIES_MAP[species]
    ].filter(Boolean);
    const filterMessage = parts.join(' ');
    const messageToSend = [inputText.trim(), filterMessage].filter(Boolean).join(' ').trim();

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend })
      });

      // Try to parse JSON even on 4xx/5xx
      let data = {};
      try { data = await res.json(); } catch {}

      if (!res.ok) {
        const msg = data?.reply || `Server error ${res.status}`;
        setMessages(prev => [...prev, { sender: 'bot', text: msg }]);
        return;
      }

      const animals = Array.isArray(data.animals) ? data.animals : [];
      setLastAnimals(animals);

      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      } else if (animals.length) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Here are some listings.' }]);
      }

      // Build a quick gallery from whatever photos exist (optional)
      const imgs = animals.map(a => a.photo).filter(Boolean);
      if (imgs.length) setGalleryImages(imgs);
    } catch (err) {
      console.error(err);
      setError('Could not reach backend. Is it running on 8001?');
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  return (
    <div className="chatbot-container">
      <aside className="chatbot-filters">
        <h2>Filters</h2>
        <div className="filter-group">
          <label>Species</label>
          <select value={species} onChange={e => setSpecies(e.target.value)}>
            <option>Dog</option>
            <option>Cat</option>
            <option>Other</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Breed</label>
          <input
            type="text"
            placeholder="e.g. pug"
            value={breed}
            onChange={e => setBreed(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Age</label>
          <select value={age} onChange={e => setAge(e.target.value)}>
            <option>Any</option>
            <option>Puppy/Kitten</option>
            <option>Adult</option>
            <option>Senior</option>
          </select>
        </div>
      </aside>

      <main className="chatbot-chat-area">
        <div className="chatbot-header">Chat</div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {/* Show "View Listings" if we have ANY animals */}
          {lastAnimals.length > 0 && (
            <button
              className="view-gallery-button"
              onClick={() => navigate('/DogGallery', { state: { animals: lastAnimals } })}
            >
              View Listings
            </button>
          )}
        </div>

        {error && <div className="chatbot-error">{error}</div>}

        <form className="chatbot-input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a new message here (add a ZIP or state for better results)"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading…' : 'Send'}
          </button>
        </form>
      </main>
    </div>
  );
}
