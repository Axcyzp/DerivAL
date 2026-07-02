import React from "react";
import useMediaQuery from "../common/useMediaQuery";
import NavigationHeader from "./NavigationHeader";
import { APP_SHELL_STYLES as S } from "./styles";

export default function AppShell({ children }) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div style={S.root}>
      <div style={S.topGlow} />
      <div style={S.bottomGlow} />

      <NavigationHeader />

      <main style={{ ...S.main, ...(isMobile ? S.mainMobile : {}) }}>
        {children}
      </main>
    </div>
  );
}
