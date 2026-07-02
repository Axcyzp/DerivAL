import React from "react";

function ThinkingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 2px",
      }}
    >
      <span style={{ ...dotStyle, animationDelay: "0s" }} />
      <span style={{ ...dotStyle, animationDelay: "0.15s" }} />
      <span style={{ ...dotStyle, animationDelay: "0.3s" }} />
      <style>{`
        @keyframes thinkingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const dotStyle = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #7d1456 0%, #a855f7 100%)",
  display: "inline-block",
  animation: "thinkingBounce 1.1s infinite ease-in-out",
};

export default ThinkingIndicator;
