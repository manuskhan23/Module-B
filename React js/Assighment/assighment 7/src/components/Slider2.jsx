import React, { useState, useEffect } from 'react';
import './Slider2.css';

const Slider2 = ({ imgData = [], title }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imgData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [imgData.length]);

  const handleManualChange = (e, i) => {
    e.preventDefault();
    setIndex(i);
  };

  return (
    <div className="s2-root">
      <h2 className="s2-title">{title}</h2>

      <div className="s2-main-wrapper">
        <div className="s2-viewport">
          <div 
            className="s2-track" 
            style={{ transform: `translateX(calc(-${index * 100}%))` }}
          >
            {imgData.map((img, i) => (
              <div key={i} className="s2-slide">
                <img src={img} alt="" className="s2-image" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="s2-dots-window">
        <div 
          className="s2-dots-track" 
          style={{ 
            transform: `translateX(${
              index < 2 ? 0 : 
              index > imgData.length - 3 ? -(imgData.length - 5) * 22 : 
              -(index - 2) * 22
            }px)` 
          }}
        >
          {imgData.map((_, i) => {
            const distance = Math.abs(i - index);
            return (
              <div 
                key={i} 
                className={`s2-dot ${index === i ? 'pill' : ''} ${distance > 2 ? 'mini' : ''}`}
                onClick={(e) => handleManualChange(e, i)}
              >
                {index === i && <div className="s2-fill" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider2;