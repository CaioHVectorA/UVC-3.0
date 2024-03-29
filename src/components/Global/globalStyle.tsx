"use client";
import { LOCAL_STORAGE_COLOR } from "@/utilities/envariables";
import { ChangeColor } from "@/utilities/functions/ChangeColors";
import { ChangeTheme } from "@/utilities/functions/ChangeTheme";
import { Inter, Montserrat } from "next/font/google";
import { useEffect } from "react";
const montserrat = Montserrat({ subsets: ["latin"] });
export default function GlobalStyle() {
  useEffect(() => {
    if (window && window.localStorage.getItem('UVC_USER_THEME') === 'LIGHT') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        ChangeTheme()
    }
  } else if (window && window.localStorage.getItem('UVC_USER_THEME') === 'DARK') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        ChangeTheme()
    }
    }
    if (window && localStorage.getItem(LOCAL_STORAGE_COLOR)) {
     //@ts-ignore
      ChangeColor(localStorage.getItem(LOCAL_STORAGE_COLOR))
    }
  }, [])
  return (
    <style jsx global>
      {`
        h1 {
          font-family: ${montserrat.style.fontFamily};
        }
        h2 {
          font-family: ${montserrat.style.fontFamily};
        }
        h3 {
          font-family: ${montserrat.style.fontFamily};
        }
        h4 {
          font-family: ${montserrat.style.fontFamily};
        }
        .montserrat {
          font-family: ${montserrat.style.fontFamily};
        }
      `}
    </style>
  );
}