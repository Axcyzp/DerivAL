import React from "react";
import { ArrowIcon } from "./icons";
import { featureCardStyle } from "./styles";

export default function FeatureCard({
  card,
  hovered,
  isMobile = false,
  styles: S,
  onClick,
  onEnter,
  onLeave,
}) {
  const { Icon } = card;

  return (
    <div
      style={featureCardStyle(hovered, isMobile)}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div>
        <div
          style={{
            ...S.iconFrame,
            backgroundColor: card.iconBg,
            color: card.iconColor,
          }}
        >
          <Icon />
        </div>

        <h3 style={S.cardHeading}>{card.heading}</h3>
        <p style={S.cardText}>{card.text}</p>

        <ul style={S.bulletList}>
          {card.bullets.map((bullet) => (
            <li key={bullet} style={S.bulletItem}>
              <span style={S.bulletCheck}>✓</span> {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div style={S.actionLink}>
        {card.cta} <ArrowIcon />
      </div>
    </div>
  );
}
