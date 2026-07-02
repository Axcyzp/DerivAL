import React from "react";

export default function SendOrStopButton({
  handleStopGenerating,
  isGenerating,
  setSendHover,
  styles,
}) {
  if (isGenerating) {
    return (
      <button
        type="button"
        style={styles.stopButton}
        onMouseEnter={() => setSendHover(true)}
        onMouseLeave={() => setSendHover(false)}
        onClick={handleStopGenerating}
        aria-label="Stop generating"
      >
        <svg width="14" height="14" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="#ffffff" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="submit"
      style={styles.sendButton}
      onMouseEnter={() => setSendHover(true)}
      onMouseLeave={() => setSendHover(false)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: "#ffffff" }}>
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    </button>
  );
}
