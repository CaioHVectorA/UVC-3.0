"use client";
import { useState, useEffect } from "react";
export const useWindowDimensions = function (): {
  width: number;
  height: number;
} {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions(): {
    width: number;
    height: number;
  } {
    const width = hasWindow ? window.innerWidth : 0;
    const height = hasWindow ? window.innerHeight : 0;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};
