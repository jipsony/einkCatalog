import React from "react";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import AppHeader from "@/components/appHeader/AppHeader";
import { Box } from "@chakra-ui/react";
import EICLogo from "@/components/appHeader/EICLogo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-INK CATALOG",
  description: "E-INK CATALOG",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <Box px={{lg:"10rem"}}>
            <AppHeader logoComponent={<EICLogo></EICLogo>} />
            <Box paddingBottom={"8rem"}>{children}</Box>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
