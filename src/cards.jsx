import React, { useState } from 'react';
import './cards.css';

const dogs = [
  {
    name: 'Brownie',
    age: '5',
    location: 'Indore',
    distance: '9 km away',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80',
    about: 'Loves to play fetch and is great with kids. Looking for a loving home!'
  },
  {
    name: 'Luna',
    age: '1',
    location: 'Mumbai',
    distance: '3 km away',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    about: 'Energetic and friendly. Loves long walks and belly rubs.'
  },
  {
    name: 'Max',
    age: '3',
    location: 'Delhi',
    distance: '5 km away',
    image: 'https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=400&q=80',
    about: 'Chill and cuddly. Enjoys naps and treats.'
  }
];

export default function Cards() {
  const [current, setCurrent] = useState(0);
  const [swipe, setSwipe] = useState(null); // 'right' for like, 'left' for nope
  const [showInfo, setShowInfo] = useState(false);

  const handleLike = () => {
    setSwipe('right');
    setTimeout(() => {
      setSwipe(null);
      setShowInfo(false);
      setCurrent((prev) => (prev + 1) % dogs.length);
    }, 500);
  };

  const handleNope = () => {
    setSwipe('left');
    setTimeout(() => {
      setSwipe(null);
      setShowInfo(false);
      setCurrent((prev) => (prev + 1) % dogs.length);
    }, 500);
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop > 40) {
      setShowInfo(true);
    }
  };

  const dog = dogs[current];

  return (
    <div className="cards-outer-container">
      <div className="cards-container">
        <div className="swipe-area">
          <div
            className={`dog-card${swipe ? ' swiped-' + swipe : ''}`}
            onWheel={handleScroll}
          >
            <div className="dog-image" style={{ backgroundImage: `url(${dog.image})` }} />
            <div className="dog-info-overlay">
              <div className="dog-main-info">
                <h2>{dog.name},<span>{dog.age}</span></h2>
                <p className="dog-location">Lives in {dog.location}</p>
                <p className="dog-distance">{dog.distance}</p>
              </div>
            </div>
            {swipe === 'right' && <div className="swipe-label like">LIKE</div>}
            {swipe === 'left' && <div className="swipe-label nope">NOPE</div>}
            <div className={`dog-more-info${showInfo ? ' show' : ''}`}>
              <h3>About {dog.name}</h3>
              <p>{dog.about}</p>
            </div>
          </div>
          <div className="swipe-buttons-row">
            <button className="swipe-btn nope" onClick={handleNope} title="Nope">✖️</button>
            <button className="swipe-btn like" onClick={handleLike} title="Like">💚</button>
          </div>
          <div className="swipe-tip">Scroll down on the card for more info</div>
        </div>
      </div>
    </div>
  );
} 