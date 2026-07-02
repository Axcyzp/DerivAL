import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../components/common/useMediaQuery";
import {
  primaryButtonStyle,
  secondaryButtonStyle,
} from "../components/home/styles";

const styles = {
  shell: {
    minHeight: "min(620px, calc(100vh - 180px))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  panel: {
    width: "min(620px, 100%)",
    padding: "42px 30px",
    border: "1px solid rgba(168,85,247,0.22)",
    borderRadius: "24px",
    background:
      "linear-gradient(160deg, rgba(61,16,96,0.22), rgba(10,10,14,0.86))",
    boxShadow:
      "0 24px 70px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.05)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    boxSizing: "border-box",
  },
  code: {
    margin: "0 0 14px 0",
    fontSize: "clamp(4rem, 13vw, 7rem)",
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: "-0.05em",
    background: "linear-gradient(180deg, #ffffff 35%, #c084fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  title: {
    margin: "0 0 12px 0",
    color: "#ffffff",
    fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
    fontWeight: 700,
    letterSpacing: "-0.03em",
  },
  text: {
    maxWidth: "460px",
    margin: "0 auto 28px auto",
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: 1.7,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  actionsMobile: {
    alignItems: "stretch",
    flexDirection: "column",
    maxWidth: "300px",
    margin: "0 auto",
  },
};

export default function NotFoundPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [homeHover, setHomeHover] = useState(false);
  const [papersHover, setPapersHover] = useState(false);

  return (
    <section style={styles.shell}>
      <div style={styles.panel}>
        <p style={styles.code}>404</p>
        <h1 style={styles.title}>Page not found</h1>
        <p style={styles.text}>
          This page does not exist or may have moved. Head back to DerivAL and
          continue your revision from there.
        </p>

        <div
          style={{
            ...styles.actions,
            ...(isMobile ? styles.actionsMobile : {}),
          }}
        >
          <button
            type="button"
            style={primaryButtonStyle(homeHover, isMobile)}
            onClick={() => navigate("/")}
            onMouseEnter={() => setHomeHover(true)}
            onMouseLeave={() => setHomeHover(false)}
          >
            Back Home
          </button>
          <button
            type="button"
            style={secondaryButtonStyle(papersHover, isMobile)}
            onClick={() => navigate("/past-papers")}
            onMouseEnter={() => setPapersHover(true)}
            onMouseLeave={() => setPapersHover(false)}
          >
            Past Papers
          </button>
        </div>
      </div>
    </section>
  );
}
