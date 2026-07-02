import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "../common/useMediaQuery";
import { FONT } from "../common/theme";

const NAV_ITEMS = [
  { label: "Features", path: "/" },
  { label: "Access Past Papers", mobileLabel: "Past Papers", path: "/past-papers" },
  { label: "AI Assistant", path: "/ai-assistant" },
];

function NavigationHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isNarrow = useMediaQuery("(max-width: 380px)");

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({});
  const itemRefs = useRef([]);

  const activeIndex = NAV_ITEMS.findIndex(
    (item) =>
      item.path === location.pathname ||
      (item.path === "/" && location.pathname === "/home"),
  );

  const targetIndex =
    hoveredIndex !== null ? hoveredIndex : activeIndex !== -1 ? activeIndex : 0;
  const currentIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useEffect(() => {
    const activeItem = itemRefs.current[targetIndex];
    if (activeItem) {
      setSliderStyle({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
      });
    }
  }, [targetIndex, isMobile]);

  return (
    <header
      style={{
        display: "flex",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: isMobile ? "flex-start" : "space-between",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "14px" : 0,
        padding: isMobile ? "18px 14px 0 14px" : "8px 20px 0 20px",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        fontFamily: FONT,
        boxSizing: "border-box",
      }}
    >
      <div
        onClick={() => navigate("/")}
        aria-label="Go to DerivAL home"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "flex-start",
          transition: "opacity 0.2s ease",
          minWidth: 0,
        }}
      >
        <img
          src="/derival-logo.svg"
          alt="DerivAL"
          style={{
            display: "block",
            width: isMobile ? "148px" : "285px",
            height: isMobile ? "auto" : "86px",
          }}
        />
      </div>

      <nav
        style={{
          position: isMobile ? "relative" : "absolute",
          left: isMobile ? "auto" : "50%",
          transform: isMobile ? "none" : "translateX(-50%)",
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? "430px" : "none",
          margin: isMobile ? "0 auto" : 0,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(61, 16, 96, 0.18)",
            padding: "4px",
            borderRadius: "30px",
            border: "1px solid rgba(168, 85, 247, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 4px 24px rgba(80, 10, 80, 0.2)",
            width: isMobile ? "100%" : "auto",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "4px",
              height: "calc(100% - 8px)",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #3d1060 0%, #6b1045 100%)",
              border: "1px solid rgba(168, 85, 247, 0.35)",
              boxShadow: "0 2px 12px rgba(125, 20, 86, 0.4)",
              transition:
                "left 0.28s cubic-bezier(0.4, 0, 0.2, 1), width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: "none",
              ...sliderStyle,
            }}
          />

          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.path}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: "relative",
                zIndex: 1,
                flex: isMobile ? "1 1 0" : "0 0 auto",
                minWidth: 0,
                padding: isMobile ? (isNarrow ? "8px 6px" : "8px 8px") : "8px 20px",
                borderRadius: "24px",
                border: "none",
                fontSize: isMobile ? (isNarrow ? "0.7rem" : "0.76rem") : "0.9rem",
                fontWeight: index === currentIndex ? "600" : "400",
                color: index === currentIndex ? "#ffffff" : "#94a3b8",
                cursor: "pointer",
                transition: "color 0.2s ease, font-weight 0.2s ease",
                whiteSpace: "nowrap",
                userSelect: "none",
                backgroundColor: "transparent",
                fontFamily: FONT,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {isMobile ? item.mobileLabel || item.label : item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default NavigationHeader;
