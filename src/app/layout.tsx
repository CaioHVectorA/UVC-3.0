import { Metadata } from "next";
import "./globals.css";
import "./App.css";
import Header from "@/components/Global/Header";
import { Inter, Montserrat } from "next/font/google";
import GlobalStyle from "../components/Global/globalStyle";
import Footer from "@/components/Global/Footer";
import AppContextProvider from "@/components/Context/AppContext";
import { Toaster } from "@/components/ui/toaster";
const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "UVC",
  description: "Site oficial do UVC - A plataforma onde você encontra várias histórias de forma livre e gratuitas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalStyle />
      <body className={inter.className}>
        <AppContextProvider>
        <Header />
          <div className="rootContainer">{children}</div>
          <Toaster />
        <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
