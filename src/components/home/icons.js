import React from "react";
import { HOME_STYLES as S } from "./styles";

export const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" style={S.icon}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const BadgeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={S.icon}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const BookIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    style={{ ...S.icon, color: "#c084fc" }}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export const PaperIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={S.icon}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={S.icon}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
