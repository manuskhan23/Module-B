import React from 'react';
import HeroButton from './HeroButton';
import './HeroSection1.css';

export default function HeroSection1({ bgi, title, subtitle , b1_text, b2_text }) {
  return (
    <section 
      className="hero-section-1"
      style={{
        backgroundImage: `url('${bgi}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          
          <div className="hero-buttons">
            <HeroButton 
              text={b1_text} 
              variant="primary"
              href="#"
            />
            <HeroButton 
              text={b2_text} 
              variant="secondary"
              href="#"
            />
          </div>
        </div>
      </div>
    </section>
  );
}