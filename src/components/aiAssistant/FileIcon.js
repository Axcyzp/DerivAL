import React from "react";

export default function FileIcon({ size = 20, color = "#94a3b8" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ fill: color }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path
        d="M14 2v6h6"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
