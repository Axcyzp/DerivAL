import React from "react";
import useMediaQuery from "../common/useMediaQuery";
import NavigationHeader from "./NavigationHeader";
import { APP_SHELL_STYLES as S } from "./styles";

export default function AppShell({ children }) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const topGlowStyle = isMobile ? { ...S.topGlow, top: "90px" } : S.topGlow;
  const bottomGlowStyle = S.bottomGlow;

  return (
    <div style={S.root}>
      <div style={topGlowStyle} />
      <div style={S.middleGlow} />
      <div style={bottomGlowStyle} />

      <NavigationHeader />

      <main style={{ ...S.main, ...(isMobile ? S.mainMobile : {}) }}>
        {children}
      </main>
    </div>
  );
}
