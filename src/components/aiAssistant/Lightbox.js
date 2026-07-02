import React, { useState, useEffect } from "react";
import { FONT } from "../common/theme";
import FileIcon from "./FileIcon";

export default function Lightbox({ item, onClose }) {
  const [closeHover, setCloseHover] = useState(false);
  const [dlHover, setDlHover] = useState(false);
  const [dlActive, setDlActive] = useState(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = item.url || URL.createObjectURL(item.rawFile);
    a.download = item.name;
    a.click();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        fontFamily: FONT,
        overflowY: "auto",
        padding: "60px 20px",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={onClose}
        onMouseEnter={() => setCloseHover(true)}
        onMouseLeave={() => setCloseHover(false)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1010,
          background: closeHover
            ? "rgba(255,255,255,0.2)"
            : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          color: "#fff",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s ease, transform 0.2s ease",
          transform: closeHover ? "scale(1.1)" : "scale(1)",
        }}
      >
        ×
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          margin: "auto",
        }}
      >
        {item.isImage ? (
          <img
            src={item.url}
            alt={item.name}
            style={{
              maxWidth: "75vw",
              maxHeight: "75vh",
              borderRadius: "12px",
              objectFit: "contain",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              background:
                "linear-gradient(160deg, rgba(61,16,96,0.35), rgba(22,22,26,0.85))",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "48px 64px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileIcon size={30} color="rgba(255,255,255,0.6)" />
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  marginBottom: "4px",
                  wordBreak: "break-all",
                }}
              >
                {item.name}
              </div>
              <div
                style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}
              >
                {item.name.split(".").pop().toUpperCase()}
              </div>
            </div>

            <button
              onMouseEnter={() => setDlHover(true)}
              onMouseLeave={() => {
                setDlHover(false);
                setDlActive(false);
              }}
              onMouseDown={() => setDlActive(true)}
              onMouseUp={() => setDlActive(false)}
              onClick={handleDownload}
              style={{
                padding: "10px 30px",
                borderRadius: "20px",
                background: dlHover
                  ? "linear-gradient(135deg, #4d1478 0%, #7d1456 100%)"
                  : "rgba(255,255,255,0.08)",
                border: dlHover
                  ? "1px solid rgba(255,255,255,0.25)"
                  : "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                fontSize: "0.88rem",
                fontWeight: "500",
                cursor: "pointer",
                transition:
                  "background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
                transform: dlActive
                  ? "scale(0.96)"
                  : dlHover
                    ? "scale(1.04)"
                    : "scale(1)",
                boxShadow: dlHover ? "0 6px 20px rgba(125,20,86,0.45)" : "none",
              }}
            >
              Download
            </button>
          </div>
        )}

        {item.isImage && (
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
            {item.name}
          </div>
        )}
      </div>
    </div>
  );
}
