import { useState } from "react";

export default function useIsMobileDevice() {
  return useState(() => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent || navigator.vendor || "";
    return /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      ua,
    );
  })[0];
}
