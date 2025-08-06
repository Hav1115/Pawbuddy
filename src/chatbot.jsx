import React from 'react';
import './chatbot.css';
import { useNavigate } from 'react-router-dom';

export default function Chatbot() {
  const navigate = useNavigate();
  return (
    <div className="chatbot-container">
      <aside className="chatbot-filters">
        <h2>Filters</h2>
        {/* Example filter options, replace with real ones as needed */}
        <div className="filter-group">
          <label>Species</label>
          <select>
            <option>Dog</option>
            <option>Cat</option>
            <option>Other</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Breed</label>
          <input type="text" placeholder="e.g. Pug" />
        </div>
        <div className="filter-group">
          <label>Age</label>
          <select>
            <option>Any</option>
            <option>Puppy/Kitten</option>
            <option>Adult</option>
            <option>Senior</option>
          </select>
        </div>
        {/* Add more filter groups as needed */}
      </aside>
      <main className="chatbot-chat-area">
        <div className="chatbot-header">Type whatever you're looking for.</div>
        <div className="chatbot-messages">
          {/* Example chat bubbles */}
          <div className="chatbot-message user">Find me a chubby pug</div>
          <div className="chatbot-message bot">Here are some chubby pugs available for adoption near you!</div>
        </div>
        <form className="chatbot-input-area" onSubmit={e => { e.preventDefault(); navigate('/cards'); }}>
          <input type="text" placeholder="Type a new message here" />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
} 