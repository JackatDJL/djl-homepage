import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";

import { TRPCReactProvider } from "~/trpc/react";
import { env } from "~/env";
import { VercelToolbar } from "@vercel/toolbar/next";

export const metadata: Metadata = {
  title: "Small Reproducible Example",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const shouldShowVercelToolbar = env.NODE_ENV === "development";
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-background text-foreground flex min-h-screen flex-col">
              <main className="flex-grow">{children}</main>
            </div>
            {shouldShowVercelToolbar && <VercelToolbar />}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
