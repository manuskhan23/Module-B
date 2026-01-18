import React, { useState, useEffect, useRef } from 'react';
import './Slider.css';

export default function Slider({ bigImgData = [], smallImgData = [], title }) {
  const [index, setIndex] = useState(0);
  const thumbViewportRef = useRef(null);

  // 1. Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bigImgData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bigImgData.length]);

  // 2. STABLE SYNC: Manual scroll prevents the page from jumping
  useEffect(() => {
    if (thumbViewportRef.current) {
      const container = thumbViewportRef.current;
      const activeCard = container.querySelectorAll('.apple-thumb-card')[index];
      
      if (activeCard) {
        // Calculate the center position manually to avoid browser "snapping"
        const scrollPos = activeCard.offsetLeft - (container.offsetWidth / 2) + (activeCard.offsetWidth / 2);
        container.scrollTo({
          left: scrollPos,
          behavior: 'smooth'
        });
      }
    }
  }, [index]);

  const handleManualChange = (e, i) => {
    e.preventDefault(); // Stop page jumping
    setIndex(i);
  };

  return (
    <div className="apple-slider-root">
      <h2 className="apple-main-title">{title}</h2>

      {/* HERO SECTION - Height is locked via CSS Aspect Ratio */}
      <div className="apple-hero-viewport">
        <div 
          className="apple-hero-track" 
          style={{ transform: `translateX(calc(-${index * 100}%))` }}
        >
          {bigImgData.map((img, i) => (
            <div key={`big-${i}`} className="apple-hero-slide">
              <img src={img} alt="" className="apple-hero-img" />
            </div>
          ))}
        </div>
      </div>

      {/* THUMBNAIL TRACK - ref moved to viewport for manual scroll control */}
      <div className="apple-thumb-viewport" ref={thumbViewportRef}>
        <div className="apple-thumb-track">
          {smallImgData.map((img, i) => (
            <div 
              key={`small-${i}`} 
              className={`apple-thumb-card ${index === i ? 'active' : ''}`}
              onClick={(e) => handleManualChange(e, i)}
            >
              <img src={img} alt="" className="apple-thumb-img" />
            </div>
          ))}
        </div>
      </div>

      {/* SLIDING DOTS */}
      <div className="apple-dots-window">
        <div 
          className="apple-dots-track" 
          style={{ 
            transform: `translateX(${
              index < 2 ? 0 : 
              index > bigImgData.length - 3 ? -(bigImgData.length - 5) * 22 : 
              -(index - 2) * 22
            }px)` 
          }}
        >
          {bigImgData.map((_, i) => {
            const distance = Math.abs(i - index);
            return (
              <div 
                key={i} 
                className={`apple-dot ${index === i ? 'is-pill' : ''} ${distance > 2 ? 'is-small' : ''}`}
                onClick={(e) => handleManualChange(e, i)}
              >
                {index === i && <div className="apple-dot-fill" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}