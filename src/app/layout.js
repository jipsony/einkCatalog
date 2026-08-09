import React from "react";
import { Geist, Geist_Mono, Roboto_Mono, Lora } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import AppHeader from "@/components/appHeader/AppHeader";
import { Box } from "@chakra-ui/react";
import AppLogo from "@/components/appHeader/AppLogo";
import { layoutPaddingX, layoutWidth, pageWidth } from "@/lib/sizes";
import Sandbox from "@/components/Sandbox";
import { GoogleAnalytics } from "@next/third-parties/google";
import { appDomain } from "@/lib/appGlobals";
import AppFooter from "@/components/appFooter/AppFooter";

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

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["italic"],
});

export default function RootLayout({ children, ...props }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col items-center"
        suppressHydrationWarning
      >
        <Provider>
          <Box width={layoutWidth} minH={"110vh"} position={"relative"}>
            {/* <Box w={layoutWidth}> */}
            <AppHeader logoComponent={<AppLogo></AppLogo>} />
            <Box paddingBottom={"5rem"} px={layoutPaddingX}>
              {children}
            </Box>

            <Box position="absolute" bottom={0} height="3.5rem" w={"100%"}>
              <AppFooter></AppFooter>
            </Box>
            {/* </Box> */}
          </Box>
        </Provider>
      </body>
      <GoogleAnalytics gaId="G-6JYFG7Y3JD" />
    </html>
  );
}

export const metadata = {
  metadataBase: new URL(appDomain),
  alternates: {
    canonical: "./",
  },
};
