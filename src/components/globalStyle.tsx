"use client";
import { Inter, Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
export default function GlobalStyle() {
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
