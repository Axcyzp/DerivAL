export const HOME_STYLES = {
  container: {
    padding: "40px 20px 0 20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: "border-box",
  },
  heroSection: { textAlign: "center", marginBottom: "40px" },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(168,85,247,0.12)",
    border: "1px solid rgba(168,85,247,0.35)",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    color: "#e9d5ff",
    fontWeight: "600",
    marginBottom: "30px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  badgeIcon: { display: "flex", alignItems: "center", color: "#c084fc" },
  mainTitle: {
    fontSize: "3.5rem",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    lineHeight: "1.15",
    maxWidth: "850px",
    margin: "0 auto 24px auto",
    background: "linear-gradient(180deg, #ffffff 50%, #e2e8f0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto 40px auto",
    lineHeight: "1.6",
    fontWeight: "400",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "60px",
  },
  sectionDivider: {
    margin: "40px 0 20px 0",
    border: "none",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  gridTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "35px",
    letterSpacing: "-0.02em",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "24px",
    maxWidth: "900px",
    margin: "0 auto 60px auto",
  },
  iconFrame: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  cardHeading: {
    fontSize: "1.35rem",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 12px 0",
  },
  cardText: {
    color: "#cbd5e1",
    fontSize: "0.95rem",
    lineHeight: "1.6",
    margin: "0 0 24px 0",
  },
  bulletList: {
    listStyleType: "none",
    padding: 0,
    margin: "0 0 24px 0",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  bulletItem: {
    color: "#f1f5f9",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  bulletCheck: { color: "#c084fc", fontWeight: "bold" },
  actionLink: {
    color: "#c084fc",
    fontSize: "0.9rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "auto",
  },
  icon: {
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.05)",
    padding: "14px 8px 10px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    width: "calc(100vw - 96px)",
    maxWidth: "none",
    margin: "0",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    boxSizing: "border-box",
  },
  footerBrand: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  footerLinks: { display: "flex", gap: "32px", marginTop: 0 },
  copyright: {
    color: "#64748b",
    fontSize: "0.85rem",
    width: "100%",
    textAlign: "center",
    marginTop: "10px",
    borderTop: "1px solid rgba(255,255,255,0.02)",
    paddingTop: "10px",
  },
};

export const primaryButtonStyle = (hovered, isMobile = false) => ({
  padding: isMobile ? "12px 18px" : "12px 28px",
  borderRadius: "30px",
  width: isMobile ? "100%" : "auto",
  background: hovered
    ? "linear-gradient(135deg, #4d1478 0%, #7d1456 100%)"
    : "linear-gradient(135deg, #3d1060 0%, #6b1045 100%)",
  color: "#ffffff",
  fontSize: "0.95rem",
  fontWeight: "600",
  border: "1px solid rgba(255,255,255,0.15)",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
  boxShadow: hovered
    ? "0 6px 24px rgba(125,20,86,0.55)"
    : "0 4px 16px rgba(80,10,80,0.35)",
  transform: hovered
    ? "translateY(-2px) scale(1.04)"
    : "translateY(0) scale(1)",
});

export const secondaryButtonStyle = (hovered, isMobile = false) => ({
  padding: isMobile ? "12px 18px" : "12px 28px",
  borderRadius: "30px",
  width: isMobile ? "100%" : "auto",
  backgroundColor: hovered ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.05)",
  color: hovered ? "#e9d5ff" : "#ffffff",
  fontSize: "0.95rem",
  fontWeight: "500",
  border: hovered
    ? "1px solid rgba(168,85,247,0.5)"
    : "1px solid rgba(255,255,255,0.2)",
  cursor: "pointer",
  transition:
    "background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
  transform: hovered ? "translateY(-2px)" : "translateY(0)",
  boxShadow: hovered ? "0 0 0 4px rgba(168,85,247,0.12)" : "none",
});

export const featureCardStyle = (hovered, isMobile = false) => ({
  background: hovered
    ? "linear-gradient(160deg, rgba(61,16,96,0.35), rgba(22,22,26,0.85))"
    : "rgba(255,255,255,0.02)",
  border: hovered
    ? "1px solid rgba(168,85,247,0.35)"
    : "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: isMobile ? "24px" : "32px",
  textAlign: "left",
  transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  cursor: "pointer",
  transform: hovered ? "translateY(-4px)" : "translateY(0)",
  boxShadow: hovered
    ? "0 8px 30px rgba(80,10,80,0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
    : "none",
  backdropFilter: hovered ? "blur(24px)" : "none",
  WebkitBackdropFilter: hovered ? "blur(24px)" : "none",
});

export const footerLinkStyle = (hovered) => ({
  color: hovered ? "#c084fc" : "#94a3b8",
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "color 0.2s ease",
  textDecoration: "none",
});


export const HOME_MOBILE_STYLES = {
  container: {
    padding: "30px 4px 0 4px",
  },
  heroSection: {
    marginBottom: "46px",
    padding: "10px 0 0 0",
  },
  badge: {
    fontSize: "0.72rem",
    padding: "7px 13px",
    marginBottom: "28px",
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  mainTitle: {
    fontSize: "clamp(2.25rem, 11vw, 3rem)",
    lineHeight: "1.16",
    marginBottom: "24px",
  },
  subtitle: {
    fontSize: "1rem",
    lineHeight: "1.7",
    marginBottom: "38px",
    maxWidth: "340px",
  },
  buttonGroup: {
    alignItems: "stretch",
    flexDirection: "column",
    gap: "14px",
    maxWidth: "310px",
    margin: "0 auto 54px auto",
  },
  sectionDivider: {
    margin: "42px 0 24px 0",
  },
  gridTitle: {
    fontSize: "1.5rem",
    marginBottom: "28px",
  },
  featuresGrid: {
    gridTemplateColumns: "1fr",
    gap: "20px",
    marginBottom: "54px",
  },
  cardHeading: {
    fontSize: "1.22rem",
  },
  cardText: {
    fontSize: "0.94rem",
    lineHeight: "1.68",
  },
  bulletList: {
    gap: "12px",
  },
  footer: {
    justifyContent: "center",
    textAlign: "center",
    gap: "12px",
    padding: "12px 0 6px 0",
    marginTop: "-10px",
  },
  footerBrand: {
    fontSize: "0.86rem",
    opacity: 0.92,
  },
  footerLinks: {
    width: "100%",
    justifyContent: "center",
    gap: "18px",
    marginTop: 0,
  },
  copyright: {
    fontSize: "0.76rem",
    marginTop: "2px",
    paddingTop: "8px",
  },
};
