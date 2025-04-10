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

// Implement Metadata Images TODO
export const metadata: Metadata = {
  title: "The Wahlen Foundation - by DJL",
  description:
    "Experience the future of elections – innovative, secure, and intuitive. The Wahlen Foundation revolutionizes your voting process with cutting-edge technology and a seamless user experience.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  generator: "Next.js",
  applicationName: "The Wahlen Foundation",
  referrer: "origin-when-cross-origin",
  keywords: [
    "elections",
    "voting platform",
    "digital voting",
    "innovation",
    "DJL",
    "revolutionary",
    "secure",
    "intuitive",
  ],
  authors: [{ name: "Jack Ruder", url: "https://jack.djl.foundation" }],
  creator: "JackatDJL",
  publisher: "The DJL Foundation",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "The Wahlen Foundation - by DJL",
    description:
      "Experience a revolutionary election platform that empowers you with modern, secure, and intuitive voting. Transform your election process with The Wahlen Foundation.",
    url: "https://wahlen.djl.foundation",
    type: "website",
    locale: "en_US",
    siteName: "The Wahlen Foundation",
    images: [
      {
        url: "/img/og.png",
        width: 1200,
        height: 630,
        alt: "The Wahlen Foundation - by DJL",
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
    title: "The Wahlen Foundation - by DJL",
    description:
      "Experience a revolutionary voting platform – modern, secure, and intuitive. Transform your election process with The Wahlen Foundation.",
    images: {
      url: "/img/og.png",
      width: 1200,
      height: 630,
      alt: "The Wahlen Foundation - by DJL",
    },
  },
  category: "Internet",
  classification: "Voting Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const shouldShowVercelToolbar = env.NODE_ENV === "development";
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
                  <Header />
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
