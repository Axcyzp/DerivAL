import React, { useState, useRef, useEffect } from "react";

function GlassSelect({ placeholder, value, options, onChange, minWidth }) {
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const containerRef = useRef(null);
  const isFullWidth = minWidth === "100%";

  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minWidth: minWidth || "160px",
        width: isFullWidth ? "100%" : "auto",
        flex: isFullWidth ? "1 1 100%" : "1 1 160px",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "100%",
          padding: "12px 18px",
          borderRadius: "12px",
          background: open
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: value ? "#fff" : "rgba(255,255,255,0.55)",
          border: open
            ? "1px solid rgba(168,85,247,0.5)"
            : "1px solid rgba(255,255,255,0.12)",
          fontSize: isFullWidth ? "0.95rem" : "1rem",
          cursor: "pointer",
          outline: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          transition:
            "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: open ? "0 0 0 4px rgba(168,85,247,0.12)" : "none",
          boxSizing: "border-box",
        }}
      >
        <span>{selectedLabel || placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            color: "rgba(255,255,255,0.5)",
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            backgroundColor: "rgba(26,26,34,0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "14px",
            padding: "6px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
            zIndex: 50,
            maxHeight: "260px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {options.map((opt, i) => (
            <div
              key={opt.value}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(-1)}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              style={{
                padding: "10px 14px",
                borderRadius: "9px",
                fontSize: isFullWidth ? "0.92rem" : "0.95rem",
                color: opt.value === value ? "#fff" : "#e2e8f0",
                backgroundColor:
                  hoverIndex === i
                    ? "rgba(168,85,247,0.18)"
                    : opt.value === value
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                whiteSpace: "normal",
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GlassSelect;
