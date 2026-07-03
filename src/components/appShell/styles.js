const glowBase = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  height: "450px",
  pointerEvents: "none",
  zIndex: 1,
};

export const APP_SHELL_STYLES = {
  root: {
    backgroundColor: "#050508",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100%",
    color: "#fff",
    position: "relative",
    overflowX: "hidden",
  },
  topGlow: {
    ...glowBase,
    top: "-15%",
    background:
      "radial-gradient(ellipse at top, rgba(135,34,182,0.15) 0%, rgba(209,39,137,0.04) 35%, transparent 55%)",
  },
  bottomGlow: {
    ...glowBase,
    bottom: 0,
    top: "unset",
    background:
      "linear-gradient(to bottom, transparent 0%, transparent 75%, #050508 100%), radial-gradient(ellipse at bottom, rgba(135,34,182,0.15) 0%, rgba(209,39,137,0.04) 35%, transparent 55%)",
  },
  middleGlow: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "600px",
    pointerEvents: "none",
    zIndex: 1,
    background:
      "radial-gradient(ellipse farthest-side at center, rgba(135,34,182,0.08) 0%, rgba(209,39,137,0.025) 45%, transparent 100%)",
  },
  main: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "120px 20px 40px 20px",
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
  },
  mainMobile: {
    padding: "136px 14px 28px 14px",
  },
};
