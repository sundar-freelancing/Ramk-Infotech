import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import "./global.scss";
import { images } from "@/constant/images";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const openSans = Open_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700","100","300","900"],
});

export const metadata: Metadata = {
  title: "RamK Infotech",
  description: "Expanding Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    favicon32x32,
    favicon16x16,
    favicon,
    faviconappletouchicon,
    faviconandroidchrome192x192,
    faviconandroidchrome512x512,
    faviconwebmanifest,
  } = images;
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Standard Favicon */}
      <link href={favicon32x32.src} rel="icon" type="image/png" sizes="32x32" />
      <link href={favicon16x16.src} rel="icon" type="image/png" sizes="16x16" />
      <link href={favicon.src} rel="shortcut icon" />

      {/* Apple Touch Icon */}
      <link href={faviconappletouchicon.src} rel="apple-touch-icon" />

      {/* Android/Chrome */}
      <link
        href={faviconandroidchrome192x192.src}
        rel="icon"
        type="image/png"
        sizes="192x192"
      />
      <link
        href={faviconandroidchrome512x512.src}
        rel="icon"
        type="image/png"
        sizes="512x512"
      />

      {/* Web App Manifest */}
      <link href={faviconwebmanifest} rel="manifest" />

      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${lato.className} antialiased overflow-x-hidden relative bg-background`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
