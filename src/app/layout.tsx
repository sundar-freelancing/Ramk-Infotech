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

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "100", "300", "900"],
});

export const metadata: Metadata = {
  // Standard SEO metadata
  title: "RamK Infotech",
  description: "Expanding Technologies",

  // Base URL for all relative URLs in metadata (used for images, URLs, etc.)
  metadataBase: new URL("https://www.ramkinfotech.com"),

  // Open Graph Protocol - Controls how your site appears when shared on social media
  // Platforms: Facebook, LinkedIn, WhatsApp, Telegram, Slack, Discord, etc.
  openGraph: {
    title: "RamK Infotech", // og:title - Main headline shown in preview
    description: "Expanding Technologies", // og:description - Text shown below title
    url: "/", // og:url - The canonical URL of the page
    siteName: "RamK Infotech", // og:site_name - Name of your website
    images: [
      {
        url: images.heroimg.src, // og:image - Preview image (1200x630 recommended)
        width: 1200, // Image width in pixels
        height: 630, // Image height in pixels
        alt: "RamK Infotech", // Alt text for accessibility
      },
    ],
    locale: "en_US", // og:locale - Language/region
    type: "website", // og:type - Content type (website, article, etc.)
  },

  // Twitter Card - Specific tags for Twitter/X platform
  twitter: {
    card: "summary_large_image", // twitter:card - Card type (large image preview)
    title: "RamK Infotech", // twitter:title - Title for Twitter
    description: "Expanding Technologies", // twitter:description - Description for Twitter
    images: [images.heroimg.src], // twitter:image - Image shown in Twitter preview
  },
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

      {/* Preload critical hero background image for LCP */}
      <link
        rel="preload"
        href="/images/emailData2.webp"
        as="image"
        type="image/webp"
      />

      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${lato.className} antialiased overflow-x-hidden relative bg-background`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
