import App from "@/app/App";
import RouterProgress from "@/components/atoms/router-progress";
import "@/styles/globals.css";
import "@/styles/nprogress.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "GoodbyeDPI UI",
  metadataBase: new URL("https://goodbyedpi-ui.vercel.app/"),
  description:
    "GoodbyeDPI UI, a graphical interface for managing DPI(Deep Packet Inspection) bypass utils (Windows 10/11).",
  openGraph: {
    title: "GoodbyeDPI UI",
    description: "UI for Managing DPI(Deep Packet Inspection) Bypass utils (Windows 10/11).",
    url: "https://goodbyedpi-ui.vercel.app/",
    siteName: "GoodbyeDPI UI",
    images: "/opengraph-image.jpg",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "var(--background)" },
    { media: "(prefers-color-scheme: dark)", color: "var(--background)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-regular antialiased`}
        suppressHydrationWarning
      >
        <RouterProgress />
        <App>{children}</App>
      </body>
    </html>
  );
}
