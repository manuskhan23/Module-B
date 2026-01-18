import React from "react";
import HeroButton from "./HeroButton";
import "./HeroSection2.css";

export default function HeroSection2({
  card1_title,
  card1_subtitle,
  card1_img_src,
  card1_b1_text,
  card1_b2_text,
  card1_theme = "dark",

  card2_logo,
  card2_title,
  card2_subtitle,
  card2_img_src,
  card2_b1_text,
  card2_b2_text,
  card2_theme = "dark"
}) {
  return (
    <section className="hero2">
      {/* CARD 1 */}
      <div className={`hero2-card ${card1_theme}`}>
        <div className="hero2-content">
          <h2>{card1_title}</h2>
          <p>{card1_subtitle}</p>
          <div className="hero2-buttons">
            <HeroButton text={card1_b1_text} variant="primary" />
            <HeroButton text={card1_b2_text} variant="secondary" />
          </div>
        </div>

        <div className="hero2-image">
          <img src={card1_img_src} alt={card1_title} />
        </div>
      </div>

      {/* CARD 2 */}
      <div className={`hero2-card ${card2_theme}`}>
        <div className="hero2-content">
          <h2 className="with-logo">
            {card2_logo}
            {card2_title}
          </h2>
          <p>{card2_subtitle}</p>
          <div className="hero2-buttons">
            <HeroButton text={card2_b1_text} variant="primary" />
            <HeroButton text={card2_b2_text} variant="secondary" />
          </div>
        </div>

        <div className="hero2-image">
          <img src={card2_img_src} alt={card2_title} />
        </div>
      </div>
    </section>
  );
}
