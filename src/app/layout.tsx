import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type React from "react";
import type { Metadata } from "next";
import Header from "~/components/header";
import Footer from "~/components/footer";
import { ThemeProvider } from "~/components/theme-provider";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { TRPCReactProvider } from "~/trpc/react";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/sonner";
import { dark } from "@clerk/themes";
import { PostHogProvider } from "~/server/providers";
import { env } from "~/env";
import { VercelToolbar } from "@vercel/toolbar/next";
import { dropdownHeaderFlag } from "~/server/flags";

export const metadata: Metadata = {
  title:
    "The DJL Foundation: Empowering Youth in Robotics, Computer Science & Engineering",
  description:
    "We support young talents in Northern Germany in robotics, computer science, and engineering. Building the future - together!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  generator: "Next.js",
  applicationName: "The DJL Foundation",
  referrer: "origin-when-cross-origin",
  keywords: [
    "youth support",
    "robotics",
    "computer science",
    "engineering",
    "Northern Germany",
    "DJL",
    "foundation",
    "education",
    "technology",
    "innovation",
    "STEM",
    "talent development",
    "shaping the future",
  ],
  authors: [
    { name: "Jack Ruder", url: "https://djl.foundation/about-us#jack-ruder" },
  ],
  creator: "JackatDJL",
  publisher: "The DJL Foundation",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "The DJL Foundation: Empowering Young Talents in Northern Germany",
    description:
      "Join us in supporting the next generation in robotics, computer science, and engineering. Building the future - together!",
    url: "https://djl.foundation",
    type: "website",
    locale: "en_US", // Adjust this if the primary language of the site is German
    siteName: "The DJL Foundation",
    images: [
      {
        url: "/img/og.png",
        width: 1200,
        height: 630,
        alt: "The DJL Foundation: Empowering Youth",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@JackatDJL",
    title: "The DJL Foundation: Shaping the Future with Young Talents",
    description:
      "We support youth in Northern Germany in robotics, computer science, and engineering. Learn more!",
    images: {
      url: "/img/og.png",
      width: 1200,
      height: 630,
      alt: "DJL Foundation: Talent Development",
    },
  },
  category: "Non-Profit",
  classification: "Educational Facility",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const shouldShowVercelToolbar = env.NODE_ENV === "development";
  const shouldShowHeaderDropdown = await dropdownHeaderFlag();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <PostHogProvider>
            <Analytics />
            <SpeedInsights />
            <TRPCReactProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster />
                <div className="bg-background text-foreground flex min-h-screen flex-col">
                  <Header isDropdownEnabled={shouldShowHeaderDropdown} />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
                {shouldShowVercelToolbar && <VercelToolbar />}
              </ThemeProvider>
            </TRPCReactProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
