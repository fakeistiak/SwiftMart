import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "SwiftMart | Instant Grocery Delivery",
  description: "An instant grocery delivery app for quick ordering and fast doorstep delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="h-screen w-full bg-white">{children}</body>
    </html>
  );
}
