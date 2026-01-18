import React from 'react';
import './HeroButton.css';

export default function HeroButton({ text, variant, onClick, href }) {
  if (href) {
    return (
      <a 
        href={href}
        className={`hero-button hero-button-${variant}`}
      >
        {text}
      </a>
    );
  }

  return (
    <button 
      className={`hero-button hero-button-${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}