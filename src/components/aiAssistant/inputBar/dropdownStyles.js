export const createDropdownStyles = (menuPosition) => ({
  container: {
    position: "fixed",
    bottom: `${menuPosition.bottom}px`,
    left: `${menuPosition.left}px`,
    minWidth: "200px",
    background:
      "linear-gradient(180deg, rgba(30,18,40,0.96) 0%, rgba(18,12,24,0.96) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(168,85,247,0.25)",
    borderRadius: "16px",
    boxShadow:
      "0 10px 34px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.06), 0 0 20px rgba(125,20,86,0.15)",
    padding: "7px",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    zIndex: 1000,
    transformOrigin: "bottom left",
    animation: "menuPopIn 0.16s cubic-bezier(0.25, 1, 0.5, 1) forwards",
  },
  item: (hovered) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "9px 10px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    borderRadius: "11px",
    color: hovered ? "#ffffff" : "#cbd5e1",
    backgroundColor: hovered ? "rgba(168,85,247,0.14)" : "transparent",
    transform: hovered ? "translateX(2px)" : "translateX(0px)",
    transition:
      "background-color 0.15s ease, color 0.15s ease, transform 0.15s ease",
  }),
  iconWrap: (hovered) => ({
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: hovered
      ? "linear-gradient(135deg, #4d1478 0%, #7d1456 100%)"
      : "rgba(255,255,255,0.06)",
    border: hovered
      ? "1px solid rgba(255,255,255,0.18)"
      : "1px solid rgba(255,255,255,0.07)",
    boxShadow: hovered ? "0 2px 10px rgba(125,20,86,0.45)" : "none",
    transition: "background 0.15s ease, box-shadow 0.15s ease",
  }),
  icon: (hovered) => ({
    width: "15px",
    height: "15px",
    fill: "none",
    stroke: hovered ? "#ffffff" : "#94a3b8",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    transition: "stroke 0.15s ease",
  }),
});
