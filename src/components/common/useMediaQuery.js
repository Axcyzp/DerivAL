import { useEffect, useState } from "react";

function getMediaQueryList(query) {
  if (typeof window === "undefined" || !window.matchMedia) return null;
  return window.matchMedia(query);
}

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    return getMediaQueryList(query)?.matches || false;
  });

  useEffect(() => {
    const mediaQuery = getMediaQueryList(query);
    if (!mediaQuery) return undefined;

    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener?.("change", updateMatches);
    return () => mediaQuery.removeEventListener?.("change", updateMatches);
  }, [query]);

  return matches;
}
