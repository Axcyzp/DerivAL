import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../components/common/useMediaQuery";
import { FEATURE_CARDS } from "../components/home/content";
import FeatureCard from "../components/home/FeatureCard";
import { BadgeIcon } from "../components/home/icons";
import Logo from "../components/appShell/Logo";
import {
  HOME_MOBILE_STYLES,
  HOME_STYLES,
  footerLinkStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from "../components/home/styles";

const mergeStyles = (base, overrides) => {
  const merged = { ...base };
  Object.entries(overrides).forEach(([key, value]) => {
    merged[key] = { ...(base[key] || {}), ...value };
  });
  return merged;
};

export default function HomePage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const S = isMobile
    ? mergeStyles(HOME_STYLES, HOME_MOBILE_STYLES)
    : HOME_STYLES;

  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const [cardHover, setCardHover] = useState(null);
  const [link1Hover, setLink1Hover] = useState(false);
  const [link2Hover, setLink2Hover] = useState(false);

  // Kept stable because the same handlers are passed into every feature card.
  const hoverCard = useCallback((i) => setCardHover(i), []);
  const unhoverCard = useCallback(() => setCardHover(null), []);

  return (
    <div style={S.container}>
      <section style={S.heroSection}>
        <div style={S.badge}>
          <span style={S.badgeIcon}>
            <BadgeIcon />
          </span>
          A-Level Mathematics Hub
        </div>

        <h1 style={S.mainTitle}>
          {isMobile ? (
            "Everything You Need for A Level Maths"
          ) : (
            <>
              Everything You Need for
              <br />A Level Maths
            </>
          )}
        </h1>

        <p style={S.subtitle}>
          Unlock the full potential of your revision strategy with our
          comprehensive archive of past-papers and a real-time AI Maths
          Assistant.
        </p>

        <div style={S.buttonGroup}>
          <button
            style={primaryButtonStyle(primaryHover, isMobile)}
            onClick={() => navigate("/ai-assistant")}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
          >
            Launch AI Assistant
          </button>
          <button
            style={secondaryButtonStyle(secondaryHover, isMobile)}
            onClick={() => navigate("/past-papers")}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
          >
            Browse Past Papers
          </button>
        </div>
      </section>

      <hr style={S.sectionDivider} />

      <h2 style={S.gridTitle}>Explore the Core Platforms</h2>

      <div style={S.featuresGrid}>
        {FEATURE_CARDS.map((card, i) => (
          <FeatureCard
            key={card.path}
            card={card}
            hovered={cardHover === i}
            isMobile={isMobile}
            styles={S}
            onClick={() => navigate(card.path)}
            onEnter={() => hoverCard(i)}
            onLeave={unhoverCard}
          />
        ))}
      </div>

      <footer style={S.footer}>
        <div style={S.footerBrand}>
          <Logo
            style={{
              display: "block",
              width: isMobile ? "145px" : "210px",
              height: "auto",
            }}
          />
        </div>

        <div style={S.footerLinks}>
          <span
            style={footerLinkStyle(link1Hover)}
            onClick={() => navigate("/past-papers")}
            onMouseEnter={() => setLink1Hover(true)}
            onMouseLeave={() => setLink1Hover(false)}
          >
            Past Papers
          </span>
          <span
            style={footerLinkStyle(link2Hover)}
            onClick={() => navigate("/ai-assistant")}
            onMouseEnter={() => setLink2Hover(true)}
            onMouseLeave={() => setLink2Hover(false)}
          >
            AI Assistant
          </span>
        </div>

        <div style={S.copyright}>
          © 2026-2027 Derive A-Level by Asad Haider Raza. A non-profit,
          student-built tool. All materials remain the property of CAIE.
        </div>
      </footer>
    </div>
  );
}
