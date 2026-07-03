export const DOC_TYPES = ["QP", "MS"];

export const PAST_PAPERS_STYLES = {
  panel: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "40px",
    borderRadius: "24px",
    marginTop: "20px",
    boxShadow: "0 0 40px rgba(168,85,247,0.08)",
  },
  heading: {
    color: "#fff",
    marginTop: 0,
    fontWeight: "700",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  intro: {
    color: "#94a3b8",
    lineHeight: "1.6",
    maxWidth: "700px",
    marginBottom: "30px",
  },
  filters: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  viewerShell: {
    marginTop: "25px",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(168,85,247,0.2)",
    background: "rgba(255,255,255,0.03)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 30px rgba(168,85,247,0.1)",
  },
  viewerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background:
      "linear-gradient(135deg, rgba(61,16,96,0.45), rgba(107,16,69,0.25))",
    borderBottom: "1px solid rgba(168,85,247,0.15)",
  },
  viewerTitle: {
    color: "#c084fc",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  viewerActions: { display: "flex", alignItems: "center", gap: "12px" },
  toggleGroup: {
    display: "flex",
    background: "rgba(0,0,0,0.25)",
    borderRadius: "10px",
    padding: "3px",
    border: "1px solid rgba(168,85,247,0.2)",
  },
  loadingState: {
    height: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#c084fc",
    backgroundColor: "#111",
  },
  missingState: {
    height: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    backgroundColor: "#111",
  },
  emptyState: {
    padding: "60px 30px",
    textAlign: "center",
    color: "#64748b",
    border: "1px dashed rgba(255,255,255,0.1)",
    borderRadius: "16px",
  },
  emptyText: { margin: 0, fontSize: "1.05rem" },
  mobileViewer: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "rgba(15,12,27,0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  },
  mobileIconFrame: {
    background: "rgba(192,132,252,0.1)",
    padding: "16px",
    borderRadius: "50%",
    display: "inline-flex",
  },
  mobilePaperTitle: {
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "6px",
  },
  mobilePaperMeta: { color: "#94a3b8", fontSize: "0.85rem" },
  mobileActions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    maxWidth: "280px",
  },
  mobileSaveButton: {
    padding: "12px 20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    color: "#94a3b8",
    border: "1px solid rgba(255,255,255,0.1)",
    fontWeight: "500",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  iframe: {
    width: "100%",
    height: "600px",
    border: "none",
    backgroundColor: "#ffffff",
  },
};

export const docTypeButtonStyle = (active, isMobile = false) => ({
  background: active
    ? "linear-gradient(135deg, #3d1060 0%, #6b1045 100%)"
    : "transparent",
  color: active ? "#fff" : "#94a3b8",
  border: "none",
  flex: isMobile ? "1 1 0" : "0 0 auto",
  padding: isMobile ? "7px 12px" : "5px 16px",
  fontSize: "0.85rem",
  fontWeight: "600",
  borderRadius: "7px",
  cursor: "pointer",
});

export const downloadButtonStyle = (hovered, isMobile = false) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: isMobile ? "8px 12px" : "6px 16px",
  borderRadius: "8px",
  background: hovered
    ? "linear-gradient(135deg, #4d1478 0%, #7d1456 100%)"
    : "linear-gradient(135deg, #3d1060 0%, #6b1045 100%)",
  color: "#fff",
  border: "1px solid rgba(168,85,247,0.35)",
  fontSize: "0.85rem",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: hovered
    ? "0 0 24px rgba(168,85,247,0.35)"
    : "0 0 16px rgba(168,85,247,0.15)",
});

export const mobileViewButtonStyle = (hovered) => ({
  padding: "14px 20px",
  borderRadius: "12px",
  background: hovered
    ? "linear-gradient(135deg, #4d1478 0%, #7d1456 100%)"
    : "linear-gradient(135deg, #3d1060 0%, #6b1045 100%)",
  color: "#fff",
  border: "1px solid rgba(168,85,247,0.4)",
  fontWeight: "600",
  fontSize: "0.95rem",
  cursor: "pointer",
  boxShadow: hovered
    ? "0 0 24px rgba(168,85,247,0.35)"
    : "0 0 16px rgba(168,85,247,0.15)",
});

export const PAST_PAPERS_MOBILE_STYLES = {
  panel: {
    padding: "30px 20px",
    borderRadius: "24px",
    marginTop: "4px",
  },
  heading: {
    fontSize: "1.35rem",
    alignItems: "center",
    marginBottom: "20px",
  },
  intro: {
    fontSize: "0.98rem",
    lineHeight: "1.7",
    marginBottom: "30px",
  },
  filters: {
    flexDirection: "column",
    gap: "14px",
    marginBottom: "34px",
  },
  viewerShell: {
    marginTop: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.04)",
  },
  viewerHeader: {
    alignItems: "center",
    flexDirection: "column",
    gap: "16px",
    padding: "18px 16px",
    textAlign: "center",
  },
  viewerTitle: {
    lineHeight: "1.55",
    fontSize: "0.92rem",
    width: "100%",
  },
  viewerActions: {
    justifyContent: "center",
    width: "100%",
  },
  toggleGroup: {
    width: "100%",
    maxWidth: "260px",
  },
  loadingState: {
    minHeight: "360px",
    height: "auto",
    padding: "54px 22px",
    textAlign: "center",
  },
  missingState: {
    minHeight: "360px",
    height: "auto",
    padding: "54px 22px",
    textAlign: "center",
  },
  emptyState: {
    padding: "58px 24px",
    background: "rgba(255,255,255,0.025)",
  },
  emptyText: {
    lineHeight: "1.55",
  },
  mobileViewer: {
    minHeight: "360px",
    padding: "52px 22px",
    justifyContent: "center",
    backgroundColor: "rgba(15,12,27,0.56)",
  },
  mobileActions: {
    maxWidth: "300px",
    gap: "14px",
  },
};
